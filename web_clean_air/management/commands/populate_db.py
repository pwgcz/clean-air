import pytz
from django.core.management.base import BaseCommand
import requests
import datetime
from django.db import connection

from web_clean_air.models import (
    IndexQuality,
    City,
    MeasuringStation,
    MeasuringStands,
    MeasuringData,
)


class Command(BaseCommand):
    help = "Load initial data from government API "

    def _create_quality_index(self):
        index = {
            "PM10": [21, 61, 101, 141, 201],
            "PM2.5": [13, 37, 61, 85, 121],
            "O3": [71, 121, 151, 181, 241],
            "NO2": [41, 101, 151, 201, 401],
            "SO2": [51, 101, 201, 351, 501],
            "C6H6": [6, 11, 16, 21, 51],
            "CO": [3000, 7000, 11000, 15000, 21000],
        }
        for name in index.keys():
            IndexQuality.objects.create(
                name=name,
                bad=index[name][4],
                sufficient=index[name][3],
                moderate=index[name][2],
                good=index[name][1],
                very_good=index[name][0],
            )

    def _create_stations_data(self):
        stations = requests.get(
            "http://api.gios.gov.pl/pjp-api/rest/station/findAll"
        ).json()

        for station in stations:
            city = City(
                id=station["city"]["id"],
                name=station["city"]["name"],
                commune_name=station["city"]["commune"]["communeName"],
                district_name=station["city"]["commune"]["districtName"],
                province_name=station["city"]["commune"]["provinceName"],
            )
            city.save()

            MeasuringStation.objects.create(
                id=station["id"],
                name=station["stationName"],
                gegrLat=station["gegrLat"],
                gegrLon=station["gegrLon"],
                cities=city,
            )

    def _create_measurement_data(self):
        # MeasuringStation

        stations = MeasuringStation.objects.all()

        # MeasuringStands
        quality_indexes = IndexQuality.objects.all()
        for station in stations:
            data_list = requests.get(
                "http://api.gios.gov.pl/pjp-api/rest/station/sensors/{}".format(
                    station.id
                )
            ).json()
            for data in data_list:
                measuring_stand = MeasuringStands(
                    id=data["id"],
                    name=data["param"]["paramName"],
                    code=data["param"]["paramCode"],
                    stations=station,
                )

                for quality_index in quality_indexes:
                    if quality_index.name == measuring_stand.code:
                        measuring_stand.indexes = quality_index
                        measuring_stand.save()
                        print(connection.queries)

        # MeasuringData

        measuring_stands = MeasuringStands.objects.all()
        for measuring_stand in measuring_stands:
            data_json = requests.get(
                "http://api.gios.gov.pl/pjp-api/rest/data/getData/{}".format(
                    measuring_stand.id
                )
            ).json()
            for data in data_json["values"]:
                measure_data = MeasuringData(
                    value=data["value"],
                    date=pytz.utc.localize(
                        datetime.datetime.strptime(data["date"], "%Y-%m-%d %H:%M:%S")
                    ),
                    sensors=measuring_stand,
                )
                measure_data.save()

    def handle(self, *args, **options):
        self._create_stations_data()
        self._create_quality_index()
        self._create_measurement_data()

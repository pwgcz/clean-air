import pytz
from django.core.management.base import BaseCommand
import requests
import datetime

from web_clean_air.models import (
    MeasuringStands,
    MeasuringData,
)


class Command(BaseCommand):
    help = "Update value from government API every hour"

    def _delete(self):
        datetime.timedelta(days=3)
        measuring_data = MeasuringData.objects.filter(date__lt=pytz.utc.localize(datetime.datetime.now() - datetime.timedelta(days=3)))
        measuring_data.delete()



    def _update(self):
        measuring_stands = MeasuringStands.objects.all()
        for measuring_stand in measuring_stands:
            data_json = requests.get(
                "http://api.gios.gov.pl/pjp-api/rest/data/getData/{}".format(
                    measuring_stand.id
                )
            ).json()
            if data_json["values"]:
                data = data_json["values"][1]
                MeasuringData.objects.create(
                    value=data["value"],
                    date=pytz.utc.localize(
                        datetime.datetime.strptime(data["date"], "%Y-%m-%d %H:%M:%S")
                    ),
                    sensors=measuring_stand,
                )

    def handle(self, *args, **options):
        self._delete()
        self._update()



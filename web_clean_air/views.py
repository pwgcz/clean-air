from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q

from .models import MeasuringData, MeasuringStands, MeasuringStation, IndexQuality, City


from .serializers import (
    IndexQualitySerializer,
    MeasuringDataSerializer,
    MeasuringStandsSerializer,
    MeasuringStationSerializer,
)


class StationsList(APIView):
    def get(self, request, format=None):
        stations = MeasuringStation.objects.all()
        serializer = MeasuringStationSerializer(stations, many=True)

        return Response(serializer.data)


class CityStations(APIView):
    def get(self, request, format=None):

        cities = City.objects.all()
        name = self.request.query_params.get("search", None)
        if name:
            cities = City.objects.filter(
                Q(name__icontains=name)
                | Q(commune_name__icontains=name)
                | Q(district_name__icontains=name)
                | Q(province_name__icontains=name)
            )

        stations_group = [
            MeasuringStation.objects.filter(cities=city.id) for city in cities
        ]

        response = []
        for stations in stations_group:
            for station in stations:
                serializer = MeasuringStationSerializer(station)
                response.append(serializer.data)

        return Response(response)


class MeasuringStandsList(APIView):
    def get(self, request, pk, format=None):
        measuring_stands = MeasuringStands.objects.filter(stations=pk)
        serializer = MeasuringStandsSerializer(measuring_stands, many=True)

        return Response(serializer.data)


class MeasuringDataList(APIView):
    def get(self, request, pk, format=None):
        measuring_data = MeasuringData.objects.filter(sensors=pk).order_by("-date")[:24]
        serializer = MeasuringDataSerializer(measuring_data, many=True)

        return Response(serializer.data)


class QualityIndicators(APIView):
    def get(self, request, pk, format=None):
        print(pk)
        index_quality = IndexQuality.objects.get(pk=pk)
        serializer = IndexQualitySerializer(index_quality, many=True)

        return Response(serializer.data)


# class PrivateStation():
#     def post(self):
#         json_data = request.get_json(force=True)
#         name = json_data['stationName']
#         print(name)

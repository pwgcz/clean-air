from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q

from .models import MeasuringData, MeasuringStands, MeasuringStation, IndexQuality, City
from rest_framework import status

from .serializers import (
    CitySerializer,
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

        name = self.request.query_params.get("search", None)

        cities = City.objects.filter(
            Q(name__icontains=name)
            | Q(commune_name__icontains=name)
            | Q(district_name__icontains=name)
            | Q(province_name__icontains=name)
        )

        stations = [MeasuringStation.objects.filter(city=city.id) for city in cities]
        serializer = MeasuringStationSerializer(stations, many=True)

        return Response(serializer.data)


class MeasuringStandsList(APIView):
    def get(self, request, pk, format=None):
        measuring_stands = MeasuringStands.object.filter(station=pk)
        serializer = MeasuringStandsSerializer(measuring_stands, many=True)

        return Response(serializer.data)


class MeasuringDataList(APIView):
    def get(self, pk, request, format=None):
        measuring_data = (
            MeasuringData.object.filter_by(sensor=pk)
            .order_by(MeasuringData.date.desc())
            .limit(24)
            .all()
        )
        serializer = MeasuringDataSerializer(measuring_data, many=True)

        return Response(serializer.data)


class QualityIndicators(APIView):
    def get(self, request, pk, format=None):
        index_quality = IndexQuality.object.get(pk=pk)
        serializer = IndexQualitySerializer(index_quality, many=True)

        return Response(serializer.data)


# class PrivateStation():
#     def post(self):
#         json_data = request.get_json(force=True)
#         name = json_data['stationName']
#         print(name)

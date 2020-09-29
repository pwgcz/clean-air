from .models import MeasuringData, MeasuringStands, MeasuringStation, IndexQuality, City
from rest_framework import serializers


class MeasuringDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeasuringData
        fields = "__all__"


class MeasuringStandsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeasuringStands
        fields = "__all__"


class MeasuringStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeasuringStation
        fields = "__all__"


class IndexQualitySerializer(serializers.ModelSerializer):
    class Meta:
        model = IndexQuality
        fields = "__all__"


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"

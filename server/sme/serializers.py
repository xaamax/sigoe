from rest_framework import serializers
from .models import Dre, Ue


class DreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dre
        fields = '__all__'


class UeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ue
        fields = '__all__'

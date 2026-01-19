from rest_framework import serializers
from apps.sme.models import Ue


class UeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ue
        fields = '__all__'

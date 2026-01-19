from rest_framework import serializers
from apps.sme.models import Dre


class DreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dre
        fields = '__all__'

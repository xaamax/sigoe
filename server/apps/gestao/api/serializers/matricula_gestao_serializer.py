from rest_framework import serializers
from apps.gestao.models import Matricula


class MatriculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matricula
        fields = '__all__'

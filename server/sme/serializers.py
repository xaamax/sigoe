from rest_framework import serializers
from .models import Dre, Ue, Turma, Aluno


class DreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dre
        fields = '__all__'


class UeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ue
        fields = '__all__'
        
        
class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        fields = '__all__'


class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = '__all__'

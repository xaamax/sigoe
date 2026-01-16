from rest_framework import serializers
from .models import Turma, Aluno, Matricula, Ocorrencia


class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        fields = '__all__'


class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = '__all__'


class MatriculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matricula
        fields = '__all__'


class OcorrenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ocorrencia
        fields = '__all__'


class OcorrenciaListaSerializer(serializers.ModelSerializer):
    ue = serializers.CharField(source='matricula.turma.ue', read_only=True)
    dre = serializers.CharField(source='matricula.turma.ue.dre', read_only=True)
    aluno = serializers.CharField(source='matricula.aluno.nome', read_only=True)
    situacao = serializers.CharField(source='get_situacao_display', read_only=True)
    tipo = serializers.CharField(source='get_tipo_display', read_only=True)

    class Meta:
        model = Ocorrencia
        fields = [
            'id',
            'data_ocorrencia',
            'tipo',
            'situacao',
            'ue',
            'dre',
            'aluno',
        ]

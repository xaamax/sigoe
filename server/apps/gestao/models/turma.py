from django.db import models

from apps.sme.models import Ue
from config.model_base import ModelBase

class Turma(ModelBase):
    codigo_turma = models.CharField(max_length=10, unique=True, verbose_name='Código')
    nome = models.CharField(max_length=100, verbose_name='Nome')
    serie_ano = models.IntegerField(verbose_name='Série/Ano')
    ano_letivo = models.IntegerField(verbose_name='Ano Letivo')
    ue = models.ForeignKey(Ue, on_delete=models.CASCADE, verbose_name='UE', db_column='codigo_ue')

    class Meta:
        verbose_name = 'Turma'
        verbose_name_plural = 'Turmas'

    def __str__(self): # pragma: no cover
        return f'{self.nome} - {self.ue.codigo_ue}'
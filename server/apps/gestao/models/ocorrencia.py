from django.db import models
from django.contrib.auth.models import User
from config.model_base import ModelBase

from ..choices import SituacaoOcorrencia, TipoOcorrencia
from apps.gestao.models import Matricula


class Ocorrencia(ModelBase):
    matricula = models.ForeignKey(Matricula, on_delete=models.CASCADE, verbose_name='Matrícula')
    tipo = models.IntegerField(choices=TipoOcorrencia.choices, verbose_name='Tipo')
    data_ocorrencia = models.DateField(verbose_name='Data da Ocorrência')
    descricao = models.TextField(verbose_name='Descrição')
    situacao = models.IntegerField(choices=SituacaoOcorrencia.choices, verbose_name='Situação')
    responsavel = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='ocorrencias',
        verbose_name='Usuário'
    )

    class Meta:
        verbose_name = 'Ocorrência'
        verbose_name_plural = 'Ocorrências'

    def __str__(self):  # pragma: no cover
        return self.descricao

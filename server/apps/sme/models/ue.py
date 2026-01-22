from django.db import models
from .dre import Dre


class Ue(models.Model):
    codigo_ue = models.CharField(primary_key=True, max_length=10, verbose_name='Código')
    nome = models.CharField(max_length=100, verbose_name='UE')
    dre = models.OneToOneField(Dre, on_delete=models.CASCADE, verbose_name='DRE', db_column='codigo_dre')

    class Meta:
        verbose_name = 'UE'
        verbose_name_plural = 'UEs'

    def __str__(self):  # pragma: no cover
        return self.nome

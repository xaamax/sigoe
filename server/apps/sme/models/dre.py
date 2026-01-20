from django.db import models


class Dre(models.Model):
    codigo_dre = models.CharField(primary_key=True, max_length=10, verbose_name='Código')
    nome = models.CharField(max_length=100, verbose_name='Nome')
    abreviacao = models.CharField(max_length=10, verbose_name='Abreviação')

    class Meta:
        db_table = 'dres'
        verbose_name = 'DRE'
        verbose_name_plural = 'DREs'

    def __str__(self): # pragma: no cover
        return self.nome

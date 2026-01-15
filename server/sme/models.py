from django.db import models


class Dre(models.Model):
    codigo_dre = models.CharField(primary_key=True, max_length=10, verbose_name='Código')
    nome = models.CharField(max_length=100, verbose_name='Nome')
    abreviacao = models.CharField(max_length=10, verbose_name='Abreviação')

    class Meta:
        db_table = 'dres'
        verbose_name = 'DRE'
        verbose_name_plural = 'DREs'

    def __str__(self):
        return self.nome


class Ue(models.Model):
    codigo_ue = models.CharField(primary_key=True, max_length=10, verbose_name='Código')
    nome = models.CharField(max_length=100, verbose_name='UE')
    dre = models.OneToOneField(Dre, on_delete=models.CASCADE, verbose_name='DRE', db_column='codigo_dre')

    class Meta:
        db_table = 'ues'
        verbose_name = 'UE'
        verbose_name_plural = 'UEs'

    def __str__(self):
        return f'{self.codigo_ue} - {self.nome}'

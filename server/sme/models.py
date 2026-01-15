from django.db import models
from core.model_base import ModelBase


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

class Turma(ModelBase):
    codigo_turma = models.CharField(max_length=10, unique=True, verbose_name='Código')
    nome = models.CharField(max_length=100, verbose_name='Nome')
    serie_ano = models.IntegerField(verbose_name='Série/Ano')
    ano_letivo = models.IntegerField(verbose_name='Ano Letivo')
    ue = models.ForeignKey(Ue, on_delete=models.CASCADE, verbose_name='UE', db_column='codigo_ue')

    class Meta:
        db_table = 'turmas'
        verbose_name = 'Turma'
        verbose_name_plural = 'Turmas'

    def __str__(self):
        return self.nome

class Aluno(ModelBase):
    nome = models.CharField(max_length=100, verbose_name='Nome')
    cpf = models.CharField(max_length=15, unique=True, verbose_name='CPF')
    cep = models.CharField(max_length=10, verbose_name='CEP')
    logradouro = models.CharField(max_length=100, blank=True, null=True, verbose_name='Logradouro')
    numero = models.IntegerField(blank=True, null=True, verbose_name='Número')
    bairro = models.CharField(max_length=100, blank=True, null=True, verbose_name='Bairro')
    cidade = models.CharField(max_length=100, blank=True, null=True, verbose_name='Cidade')
    estado = models.CharField(max_length=100, blank=True, null=True, verbose_name='Estado')
    responsavel = models.CharField(max_length=100, verbose_name='Responsável')
    telefone_responsavel = models.CharField(max_length=15, verbose_name='Responsável Telefone')

    @property
    def endereco(self):
        return f'{self.logradouro}, {self.numero} - {self.bairro} - {self.cidade}/{self.estado} - {self.cep} '

    class Meta:
        db_table = 'alunos'
        verbose_name = 'Aluno'
        verbose_name_plural = 'Alunos'

    def __str__(self):
        return self.nome

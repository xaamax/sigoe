from django.db import models
from config.model_base import ModelBase


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
    def endereco(self): # pragma: no cover
        return f'{self.logradouro}, {self.numero} - {self.bairro} - {self.cidade}/{self.estado} - {self.cep} '

    class Meta:
        db_table = 'alunos'
        verbose_name = 'Aluno'
        verbose_name_plural = 'Alunos'

    def __str__(self): # pragma: no cover
        return self.nome
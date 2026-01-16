from django.db import models
from sme.models import Ue
from core.model_base import ModelBase
from django.contrib.auth.models import User
from .choices import SituacaoOcorrencia, TipoOcorrencia


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
        return f'{self.nome} - {self.ue.codigo_ue}'


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


class Matricula(ModelBase):
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE, verbose_name='Turma', db_column='codigo_turma')
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, verbose_name='Aluno')

    class Meta:
        db_table = 'matriculas'
        verbose_name = 'Matrícula'
        verbose_name_plural = 'Matrículas'

    def __str__(self):
        return f'{self.aluno.nome} - {self.turma.nome} - {self.turma.ue.codigo_ue}'


class Ocorrencia(ModelBase):
    matricula = models.ForeignKey(Matricula, on_delete=models.CASCADE, verbose_name='Matrícula')
    tipo = models.IntegerField(choices=TipoOcorrencia.choices, verbose_name='Tipo')
    data_ocorrencia = models.DateField(verbose_name='Data da Ocorrência')
    descricao = models.TextField(verbose_name='Descrição')
    situacao = models.IntegerField(choices=SituacaoOcorrencia.choices, verbose_name='Situação')
    responsavel = models.OneToOneField(
        User,
        on_delete=models.PROTECT,
        related_name='ocorrencias',
        verbose_name='Usuário'
    )

    class Meta:
        db_table = 'ocorrencias'
        verbose_name = 'Ocorrência'
        verbose_name_plural = 'Ocorrências'

    def __str__(self):
        return self.descricao

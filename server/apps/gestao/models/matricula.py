from django.db import models

from apps.gestao.models import Turma, Aluno
from config.model_base import ModelBase


class Matricula(ModelBase):
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE, verbose_name='Turma', db_column='codigo_turma')
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, verbose_name='Aluno')

    class Meta:
        db_table = 'matriculas'
        verbose_name = 'Matrícula'
        verbose_name_plural = 'Matrículas'

    def __str__(self):
        return f'{self.aluno.nome} - {self.turma.nome} - {self.turma.ue.codigo_ue}'
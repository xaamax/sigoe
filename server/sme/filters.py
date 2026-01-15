from dj_rql.filter_cls import AutoRQLFilterClass
from .models import Dre, Ue, Turma, Aluno


class DreFilterClass(AutoRQLFilterClass):
    MODEL = Dre


class UeFilterClass(AutoRQLFilterClass):
    MODEL = Ue

class TurmaFilterClass(AutoRQLFilterClass):
    MODEL = Turma

class AlunoFilterClass(AutoRQLFilterClass):
    MODEL = Aluno

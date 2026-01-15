from dj_rql.filter_cls import AutoRQLFilterClass
from .models import Aluno


class AlunoFilterClass(AutoRQLFilterClass):
    MODEL = Aluno

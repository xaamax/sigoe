from dj_rql.filter_cls import AutoRQLFilterClass
from apps.gestao.models import Aluno


class AlunoFilterClass(AutoRQLFilterClass):
    MODEL = Aluno

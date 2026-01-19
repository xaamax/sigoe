from dj_rql.filter_cls import AutoRQLFilterClass
from apps.gestao.models import Turma


class TurmaFilterClass(AutoRQLFilterClass):
    MODEL = Turma

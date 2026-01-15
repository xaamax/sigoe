from dj_rql.filter_cls import AutoRQLFilterClass
from .models import Turma, Aluno, Ocorrencia


class TurmaFilterClass(AutoRQLFilterClass):
    MODEL = Turma
    

class AlunoFilterClass(AutoRQLFilterClass):
    MODEL = Aluno
    

class OcorrenciaFilterClass(AutoRQLFilterClass):
    MODEL = Ocorrencia
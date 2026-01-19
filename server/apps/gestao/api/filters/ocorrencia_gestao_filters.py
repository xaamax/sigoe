from dj_rql.filter_cls import AutoRQLFilterClass
from apps.gestao.models import Ocorrencia


class OcorrenciaFilterClass(AutoRQLFilterClass):
    MODEL = Ocorrencia


from dj_rql.filter_cls import AutoRQLFilterClass
from .models import Dre, Ue


class DreFilterClass(AutoRQLFilterClass):
    MODEL = Dre


class UeFilterClass(AutoRQLFilterClass):
    MODEL = Ue

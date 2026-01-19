from dj_rql.filter_cls import AutoRQLFilterClass
from apps.sme.models import Dre


class DreFilterClass(AutoRQLFilterClass):
    MODEL = Dre

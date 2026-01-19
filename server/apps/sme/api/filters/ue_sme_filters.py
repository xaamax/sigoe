from dj_rql.filter_cls import AutoRQLFilterClass
from apps.sme.models import Ue


class UeFilterClass(AutoRQLFilterClass):
    MODEL = Ue

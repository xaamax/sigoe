from rest_framework.permissions import DjangoModelPermissions
from rest_framework import viewsets

from .filters import AlunoFilterClass
from .models import Aluno
from .serializers import AlunoSerializer


class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    rql_filter_class = AlunoFilterClass
    serializer_class = AlunoSerializer
    permission_classes = [DjangoModelPermissions]

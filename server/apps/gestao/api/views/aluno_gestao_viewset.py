from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from rest_framework import viewsets

from apps.gestao.api.filters import AlunoFilterClass
from apps.gestao.models import Aluno
from apps.gestao.api.serializers import AlunoSerializer


class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    rql_filter_class = AlunoFilterClass
    serializer_class = AlunoSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]

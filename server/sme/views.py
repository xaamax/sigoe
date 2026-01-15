from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from rest_framework import viewsets

from .filters import DreFilterClass, UeFilterClass, TurmaFilterClass, AlunoFilterClass
from .models import Dre, Ue, Turma, Aluno
from .serializers import DreSerializer, UeSerializer, TurmaSerializer, AlunoSerializer


class DreViewSet(viewsets.ModelViewSet):
    queryset = Dre.objects.all()
    rql_filter_class = DreFilterClass
    serializer_class = DreSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]


class UeViewSet(viewsets.ModelViewSet):
    queryset = Ue.objects.all()
    rql_filter_class = UeFilterClass
    serializer_class = UeSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]


class TurmaViewSet(viewsets.ModelViewSet):
    queryset = Turma.objects.all()
    rql_filter_class = TurmaFilterClass
    serializer_class = TurmaSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]



class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    rql_filter_class = AlunoFilterClass
    serializer_class = AlunoSerializer
    permission_classes = [DjangoModelPermissions]

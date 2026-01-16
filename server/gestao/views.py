from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from rest_framework import viewsets

from .models import Turma, Aluno, Matricula, Ocorrencia
from .serializers import TurmaSerializer, AlunoSerializer, MatriculaSerializer, OcorrenciaSerializer, OcorrenciaListaSerializer
from .filters import TurmaFilterClass, AlunoFilterClass, OcorrenciaFilterClass


class TurmaViewSet(viewsets.ModelViewSet):
    queryset = Turma.objects.all()
    rql_filter_class = TurmaFilterClass
    serializer_class = TurmaSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]


class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    rql_filter_class = AlunoFilterClass
    serializer_class = AlunoSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]


class MatriculaViewSet(viewsets.ModelViewSet):
    queryset = Matricula.objects.all()
    serializer_class = MatriculaSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]


class OcorrenciaViewSet(viewsets.ModelViewSet):
    queryset = Ocorrencia.objects.all()
    rql_filter_class = OcorrenciaFilterClass
    permission_classes = [DjangoModelPermissions]

    def get_serializer_class(self):
        if self.action in ['list']:
            return OcorrenciaListaSerializer
        return OcorrenciaSerializer

from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

from .models import Turma, Aluno, Matricula, Ocorrencia
from .serializers import TurmaSerializer, AlunoSerializer, MatriculaSerializer, OcorrenciaSerializer, OcorrenciaListaSerializer, OcorrenciaDetalhesSerializer
from .filters import TurmaFilterClass, AlunoFilterClass, OcorrenciaFilterClass

User = get_user_model()

class TurmaViewSet(viewsets.ModelViewSet):
    queryset = Turma.objects.all()
    rql_filter_class = TurmaFilterClass
    serializer_class = TurmaSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]

    @action(detail=False, methods=["get"], url_path="por-ue/(?P<codigo_ue>[^/.]+)")
    def por_ue(self, request, codigo_ue=None):
        ues = Turma.objects.filter(ue_id=codigo_ue)

        serializer = self.get_serializer(ues, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    rql_filter_class = AlunoFilterClass
    serializer_class = AlunoSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]


class MatriculaViewSet(viewsets.ModelViewSet):
    queryset = Matricula.objects.all()
    serializer_class = MatriculaSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]

    @action(detail=False, methods=["get"], url_path="por-turma/(?P<turma_id>[^/.]+)")
    def por_turma(self, request, turma_id=None):
        alunos_ids = (
            Matricula.objects
            .filter(turma_id=turma_id)
            .values_list("aluno_id", flat=True)
        )

        alunos = Aluno.objects.filter(id__in=alunos_ids)

        serializer = AlunoSerializer(alunos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OcorrenciaViewSet(viewsets.ModelViewSet):
    queryset = Ocorrencia.objects.all()
    rql_filter_class = OcorrenciaFilterClass
    permission_classes = [DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(responsavel=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return OcorrenciaListaSerializer
        if self.action == 'retrieve':
            return OcorrenciaDetalhesSerializer
        return OcorrenciaSerializer

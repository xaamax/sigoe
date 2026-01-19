from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from apps.gestao.models import Aluno, Matricula
from apps.gestao.api.serializers import AlunoSerializer, MatriculaSerializer


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

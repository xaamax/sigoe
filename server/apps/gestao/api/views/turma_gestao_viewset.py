from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from apps.gestao.api.filters import TurmaFilterClass
from apps.gestao.models import Turma
from apps.gestao.api.serializers import TurmaSerializer


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

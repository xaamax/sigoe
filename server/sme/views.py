from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from .filters import DreFilterClass, UeFilterClass
from .models import Dre, Ue
from .serializers import DreSerializer, UeSerializer


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
    
    @action(detail=False, methods=["get"], url_path="por-dre/(?P<codigo_dre>[^/.]+)")
    def por_dre(self, request, codigo_dre=None):
        ues = Ue.objects.filter(dre_id=codigo_dre)

        serializer = self.get_serializer(ues, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

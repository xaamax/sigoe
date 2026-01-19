from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    TurmaViewSet,
    AlunoViewSet,
    MatriculaViewSet,
    OcorrenciaViewSet,
)

router = DefaultRouter()
router.register('turmas', TurmaViewSet)
router.register('alunos', AlunoViewSet)
router.register('matriculas', MatriculaViewSet)
router.register('ocorrencias', OcorrenciaViewSet)

urlpatterns = [
    path('gestao/', include(router.urls))
]

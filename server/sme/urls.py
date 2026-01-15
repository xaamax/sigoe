from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import DreViewSet, UeViewSet, TurmaViewSet, AlunoViewSet

router = DefaultRouter()
router.register('dres', DreViewSet)
router.register('ues', UeViewSet)
router.register('turmas', TurmaViewSet)
router.register('alunos', AlunoViewSet)

urlpatterns = [
    path('sme/', include(router.urls))
]

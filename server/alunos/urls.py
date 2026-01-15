from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AlunoViewSet

router = DefaultRouter()
router.register('alunos', AlunoViewSet)

urlpatterns = [
    path('', include(router.urls))
]

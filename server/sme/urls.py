from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import DreViewSet, UeViewSet

router = DefaultRouter()
router.register('dres', DreViewSet)
router.register('ues', UeViewSet)

urlpatterns = [
    path('sme/', include(router.urls))
]

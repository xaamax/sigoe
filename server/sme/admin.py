from django.contrib import admin
from .models import Dre, Ue


@admin.register(Dre)
class DreAdmin(admin.ModelAdmin):
    list_display = ('codigo_dre', 'nome', 'abreviacao')
    list_filter = ('codigo_dre', 'nome')
    search_fields = ('codigo_dre', 'nome')


@admin.register(Ue)
class UeAdmin(admin.ModelAdmin):
    list_display = ('codigo_ue', 'nome', 'dre')
    list_filter = ('codigo_ue', 'nome', 'dre')
    search_fields = ('codigo_ue', 'nome')

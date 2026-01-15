from django.contrib import admin
from .models import Dre, Ue, Turma, Aluno


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
    

@admin.register(Turma)
class TurmaAdmin(admin.ModelAdmin):
    list_display = ('codigo_turma', 'nome', 'ano_letivo')
    list_filter = ('codigo_turma',)
    search_fields = ('codigo_turma',)


@admin.register(Aluno)
class AlunosAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf', 'endereco')
    list_filter = ('nome', 'cpf')
    search_fields = ('nome', 'cpf')

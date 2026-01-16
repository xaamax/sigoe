from django.contrib import admin
from .models import Turma, Aluno, Matricula, Ocorrencia


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


@admin.register(Matricula)
class MatriculaAdmin(admin.ModelAdmin):
    list_display = ('turma', 'aluno')
    list_filter = ('turma', 'aluno')
    search_fields = ('turma__nome', 'aluno__nome')


@admin.register(Ocorrencia)
class OcorrenciaAdmin(admin.ModelAdmin):
    list_display = (
        'data_ocorrencia',
        'ue',
        'aluno',
        'tipo',
        'descricao',
        'situacao'
    )
    list_filter = ('data_ocorrencia', 'matricula__turma__ue__nome', 'tipo', 'situacao')
    search_fields = ('descricao', 'tipo', 'situacao')

    @admin.display(description='UE', ordering='matricula__turma__ue__nome')
    def ue(self, obj):
        return obj.matricula.turma.ue.nome

    @admin.display(description='Aluno', ordering='matricula__aluno__nome')
    def aluno(self, obj):
        return obj.matricula.aluno.nome

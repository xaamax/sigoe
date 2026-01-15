from django.contrib import admin
from .models import Aluno


@admin.register(Aluno)
class AlunosAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cpf', 'endereco')
    list_filter = ('nome', 'cpf')
    search_fields = ('nome', 'cpf')

from django.apps import AppConfig

class GestaoConfig(AppConfig):
    name = 'gestao'
    verbose_name = 'Gestão Escolar'

    def ready(self):
        import gestao.signals # noqa: F401
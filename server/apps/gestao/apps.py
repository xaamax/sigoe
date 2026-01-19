from django.apps import AppConfig


class GestaoConfig(AppConfig):
    name = 'apps.gestao'
    verbose_name = 'Gestão Escolar'

    def ready(self):
        import apps.gestao.signals  # noqa: F401

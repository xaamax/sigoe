from django.db import models


class ModelBase(models.Model):
    criado_em = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Criado em'
    )
    alterado_em = models.DateTimeField(
        auto_now=True,
        verbose_name='Alterado em'
    )

    class Meta:
        abstract = True

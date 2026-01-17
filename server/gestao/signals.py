from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from .models import Aluno
from .tasks import completar_endereco_por_cep


@receiver(pre_save, sender=Aluno)
def guardar_cep_anterior(sender, instance, **kwargs):
    if instance.pk:
        try:
            instance._cep_anterior = (
                Aluno.objects
                .only("cep")
                .get(pk=instance.pk)
                .cep
            )
        except Aluno.DoesNotExist:
            instance._cep_anterior = None
    else:
        instance._cep_anterior = None

@receiver(post_save, sender=Aluno)
def preencher_endereco_por_cep(sender, instance, created, **kwargs):
    cep_atual = instance.cep
    cep_anterior = getattr(instance, "_cep_anterior", None)

    if cep_atual and (created or cep_atual != cep_anterior):
        completar_endereco_por_cep.delay(instance.id)

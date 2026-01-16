from django.db import models


class SituacaoOcorrencia(models.IntegerChoices):
    AGUARDANDO_ANALISE = 1, 'Aguardando análise'
    ACAO_PEDAGOGICA_REALIZADA = 2, 'Ação pedagógica realizada'
    FINALIZADA = 3, 'Finalizada'


class TipoOcorrencia(models.IntegerChoices):
    COMPORTAMENTO = 1, 'Comportamento'
    SAUDE = 2, 'Saúde'
    CONVIVENCIA = 3, 'Convivência'
    ACIDENTE = 4, 'Acidente'

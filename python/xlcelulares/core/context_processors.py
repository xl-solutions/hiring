from .models import Manufacturer


def manufacturers(request):
    # Será útil para criar o formulário de busca dinâmico
    # nas views search e inventory do app core
    return {
        'manufacturers': Manufacturer. \
                    objects.all().values_list('name', flat=True)
    }

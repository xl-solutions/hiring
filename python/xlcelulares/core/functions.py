import csv
import re
from django.db import transaction, IntegrityError
from django.core.exceptions import ValidationError
from .models import Manufacturer, Phone


# Funções de utilidade local


def create_phone_records(csv_file):
    """
    Cria os registros de aparelhos no banco de dados a partir
    do arquivo CSV recebido (inventário), indicando o erro que
    impossibilitou a criação, quando houver.

    Usa transaction.atomic(), ou seja, se um objeto não puder ser
    criado em banco de dados nenhum será.

    Retorna um dicionário que indica o sucesso da operação com True
    na chave 'success'.
    Caso 'success' seja false, a causa estará presente na chave 'error'.
    """

    # A lista ordenada das colunas que devem constar no cabeçalho do
    #  arquivo de entrada
    COLUMN_HEADER = [
        'manufacturer', 'model', 'color',
        'carrier_plan_type', 'quantity', 'price'
    ]

    # A lista ordenada das colunas cujos valores não podem ser nulos
    REQUIRED_COLUMNS = [
        'manufacturer', 'model', 'color',
        'carrier_plan_type', 'quantity', 'price'
    ]

    # O dicionário que é retornado e indica o sucesso da operação
    # ou os erros encontrados
    result = {
        'success': True,
        'error': ''
    }
        
    with open(csv_file.path, mode='r') as input_file:
        csv_reader = csv.DictReader(input_file, restkey='extra_values')
        
        try:
            # Testa se o cabeçalho do arquivo csv está correto
            # Encerra a função se não estiver
            assert csv_reader.fieldnames == COLUMN_HEADER
        except AssertionError:
            result['success'] = False
            result['error'] = f"""This file's column header is incorrect. 
                It should read {','.join(COLUMN_HEADER)}."""
            return result

        try:
            with transaction.atomic():
                # Registros de Phone são apagados em cascata
                Manufacturer.objects.all().delete()

                for count, row in enumerate(csv_reader, start=1):
                    assert csv_reader.restkey not in row, f"""More
                        values than columns on line {count}."""

                    manufacturer = Manufacturer.objects.get_or_create(
                        name=row.pop('manufacturer')
                    )[0]

                    phone = Phone.objects.create(
                        manufacturer=manufacturer,
                        **row
                    )

        except AssertionError:
            # Há mais valores em uma linha do que colunas
            # Usa count + 1 porque o leitor de csv desconsidera o
            # cabeçalho
            result['success'] = False
            result['error'] = trim_string(f"""More values than columns
                at line {count + 1}.""")

        except ValidationError:
            # Foi informado um valor diferente do tipo esperado
            result['success'] = False
            result['error'] = trim_string(f"""Types mismatch in one 
                or more values at line {count + 1}.""")

        except IntegrityError:
            # Valores obrigatórios não foram informados
            result['success'] = False
            result['error'] = trim_string(f"""Less values than required 
                at line {count + 1}.
                Values {', '.join(REQUIRED_COLUMNS)} are required.""")
            
    input_file.close()

    if result['success']:
        result.pop('error')

    return result


def trim_string(string):
    """
    Remove espaço de tabulação e quebras de linha de uma string.
    """
    return re.sub('\s+',' ', string)

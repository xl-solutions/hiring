import os
from django.test import TestCase, Client
from core.models import Phone, Manufacturer

# Testes unitários da aplicação.

TESTS_PATH = os.path.dirname(os.path.abspath(__file__))


class CsvParsing(TestCase):
    """
    Testa os possíveis casos de arquivos csv submetidos para
    conversão e registro em banco de dados.
    """
    def setUp(self):
        # objetos em Phone são apagados em cascata
        Manufacturer.objects.all().delete()

    def test_extra_values_csv(self):
        """
        Testa se um arquivo com uma linha que tem mais valores
        que colunas provoca criação de registros no banco de dados.
        """
        client = Client()
        filename = os.path.join(TESTS_PATH, 'input_invalid_extra_values.csv')
        with open(filename) as csv_file:
            response = client.post('/', {'csv_file': csv_file}, follow=True)
        csv_file.close()
        queryset = Phone.objects.all()

        # Há uma chave indicando o erro no contexto
        self.assertTrue('error' in response.context)
        # Não foi criado nenhum registro de Phone
        self.assertFalse(queryset.exists())


    def test_lacks_values_csv(self):
        """
        Testa se um arquivo com uma ou mais linhas onde os valores
        requeridos não foram preenchidos é processado.
        """
        client = Client()
        filename = os.path.join(TESTS_PATH, 'input_invalid_lacks_values.csv')
        with open(filename) as csv_file:
            response = client.post('/', {'csv_file': csv_file}, follow=True)
        csv_file.close()
        queryset = Phone.objects.all()

        # Há uma chave indicando o erro no contexto
        self.assertTrue('error' in response.context)
        # Não foi criado nenhum registro de Phone
        self.assertFalse(queryset.exists())


    def test_type_mismatch_csv(self):
        """
        Caso em que um ou mais valores no arquivo apresentam
        divergência quanto ao tipo esperado.
        """
        client = Client()
        filename = os.path.join(TESTS_PATH, 'input_invalid_type_mismatch.csv')
        with open(filename) as csv_file:
            response = client.post('/', {'csv_file': csv_file}, follow=True)
        csv_file.close()
        queryset = Phone.objects.all()

        # Há uma chave indicando o erro no contexto
        self.assertTrue('error' in response.context)
        # Não foi criado nenhum registro de Phone
        self.assertFalse(queryset.exists())


    def test_wrong_header_csv(self):
        """
        Caso em que o cabeçalho com as colunas no arquivo é diferente de
        "manufacturer,model,color,carrier_plan_type,quantity,price".
        """
        client = Client()
        filename = os.path.join(TESTS_PATH, 'input_invalid_wrong_header.csv')
        with open(filename) as csv_file:
            response = client.post('/', {'csv_file': csv_file}, follow=True)
        csv_file.close()
        queryset = Phone.objects.all()

        # Há uma chave indicando o erro no contexto
        self.assertTrue('error' in response.context)
        # Não foi criado nenhum registro de Phone
        self.assertFalse(queryset.exists())


    def test_invalid_extension_file(self):
        """
        Tenta submeter uma arquivo com uma extensão que não é '.csv'.
        """
        client = Client()
        filename = os.path.join(TESTS_PATH, 'input_invalid_file_extension.txt')
        with open(filename) as csv_file:
            response = client.post('/', {'csv_file': csv_file}, follow=True)
        csv_file.close()
        queryset = Phone.objects.all()

        # Não foi criado nenhum registro de Phone
        self.assertFalse(queryset.exists())


    def test_valid_input_file(self):
        """
        Usa um arquivo válido para certificar o funcionamento da
        aplicação. No arquivo teste, 12 registros estão presentes.
        """
        client = Client()
        filename = os.path.join(TESTS_PATH, 'input_valid.csv')
        with open(filename) as csv_file:
            response = client.post('/', {'csv_file': csv_file}, follow=True)
        csv_file.close()
        queryset_count = Phone.objects.all().count()

        # Há uma chave indicando os registros criados devolvidos
        # no template
        self.assertTrue('phones' in response.context)
        # Foram criados 12 registros, conforme o arquivo enviado
        self.assertEqual(queryset_count, 12)



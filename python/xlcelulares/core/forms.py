from django.forms import ModelForm
from .models import UploadedCsvFile


# Formulários do projeto.


class FileUploadForm(ModelForm):
    """
    O formulário onde o usuário vai inserir o arquivo
    .csv contendo o estado atual do inventário de
    telefones
    """
    class Meta:
        model = UploadedCsvFile
        fields = ['csv_file']

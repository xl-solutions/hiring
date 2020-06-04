from django.db import models
from django.core.validators import FileExtensionValidator

# Modelos ORM do projeto.


class Manufacturer(models.Model):
    """
    O modelo de banco de dados para um fabricante de celulares.
    """
    name = models.CharField(
        'Name',
        max_length=100,
        unique=True
    )

    def __str__(self):
        return self.name


class Phone(models.Model):
    """
    O modelo de banco de dados para um aparelho celular.
    """
    CARRIER_PLAN_TYPE_CHOICES = [
        ('pre', 'Prepaid'),
        ('pos', 'Postpaid')
    ]
    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.CASCADE,
        related_name='phones',
        related_query_name='phone'
    )
    model = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    carrier_plan_type = models.CharField(
        max_length=100,
        choices=CARRIER_PLAN_TYPE_CHOICES
    )
    quantity = models.IntegerField()
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.model


class UploadedCsvFile(models.Model):
    """
    O modelo ORM que registra os uploads de arquivos .csv.
    """
    csv_file = models.FileField(
        upload_to='inventory_files',
        validators=[FileExtensionValidator(
            allowed_extensions=['csv']
        )]
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.csv_file.name

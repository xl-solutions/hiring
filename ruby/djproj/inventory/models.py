from django.db import models

# Create your models here.
class Product(models.Model):
    manufacturer = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    color = models.CharField(max_length=10)
    carrier_plan_type = models.CharField(max_length=3)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=7, decimal_places=2)


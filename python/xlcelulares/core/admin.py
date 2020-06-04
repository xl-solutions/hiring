from django.contrib import admin
from .models import Manufacturer, Phone, UploadedCsvFile

# Register your models here.


@admin.register(Manufacturer)
class ManufacturerModelAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Phone)
class PhoneModelAdmin(admin.ModelAdmin):
    list_display = [
        'manufacturer',
        'model',
        'color',
        'carrier_plan_type',
        'price'
    ]
    list_fields = ['manufacturer', 'carrier_plan_type']
    search_fields = [
        'manufacturer__name',
        'model',
        'carrier_plan_type'
    ]


@admin.register(UploadedCsvFile)
class UploadedCsvFileModelAdmin(admin.ModelAdmin):
    list_display = ['csv_file', 'uploaded_at']


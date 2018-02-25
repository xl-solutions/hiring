from rest_framework import serializers, viewsets, views
from rest_framework.fields import FileField
from .models import Product
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from csv import DictReader
from io import StringIO
from django.db import transaction

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = {
        'manufacturer': ['contains',], 
        'model': ['contains',], 
        'carrier_plan_type': ['exact',]
    }
        

class FileUploadView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    @transaction.atomic
    def put(self, request, format=None):
        print(request.data)
        file_obj = request.data['file']

        reader = DictReader(StringIO(file_obj.read().decode("utf-8")))

        Product.objects.all().delete()

        try:
            for row in reader:                                            
                p = Product()
                
                p.manufacturer = row['manufacturer']
                p.model = row['model']
                p.color = row['color']
                p.carrier_plan_type = row['carrier_plan_type']
                p.quantity = row['quantity']
                p.price = row['price']

                p.save()
        except:
            return Response(data="Dados inválidos", status=400)

        return Response(status=201)        
from rest_framework.test import APITestCase
from .models import Product
from io import StringIO
from django.test.client import encode_multipart, RequestFactory
from rest_framework.test import APIClient
from rest_framework.reverse import reverse

# Create your tests here.
class ApiTest(APITestCase):

    def test_upload(self):        

        client = APIClient()
        csv = StringIO(
            "manufacturer,model,color,carrier_plan_type,quantity,price\n"+\
            "Motorola,Moto G5 16GB,Preto,pre,20,1299\n"+\
            "Samsung,Galaxy S8 64GB,Arctic Gray,pre,20,4500\n"+\
            "Apple,iPhone SE 16GB,Space Gray,pre,10,2599\n"
        )
        csv.seek(0)
        data = {'file': csv}

        content = encode_multipart('BoUnDaRyStRiNg', data)
        content_type = 'multipart/form-data; boundary=BoUnDaRyStRiNg'
        response = self.client.put(reverse('upload'), content, content_type=content_type)        

        self.assertEqual(Product.objects.count(), 4)

        #response = self.client.get('/api/product?manufacturer=Motorola')
        #print(response.data)


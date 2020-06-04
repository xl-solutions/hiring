from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import FileUploadForm
from .functions import create_phone_records
from .models import Phone, Manufacturer

# Views do projeto.


def upload_form_view(request):
    """
    A view inicial que contém o formulário de upload do
    arquivo de inventário.
    Processa o arquivo recebido e renderiza a resposta.
    """
    context = {}

    # Caso em que um formulário foi recebido
    if request.method == 'POST':
        file_form = FileUploadForm(request.POST, request.FILES)

        # Testa se o formulário foi preenchido corretamente
        # (arquivo existe e trata-se de um .csv)
        if file_form.is_valid():
            form_object = file_form.save()

            # usa uma função externa para criar os registros
            result = create_phone_records(form_object.csv_file)
            
            if result['success']:
                return redirect('inventory')
            else:
                context['error'] = result['error']

            return render(request, "inventory.html", context)
        else:
            return render(request, "upload_form.html", context={
                'file_form': file_form
            })

    else:
        context['file_form'] = FileUploadForm()

    return render(request, "upload_form.html", context)


def search(request):
    """
    Efetua a busca em banco de dados de telefones através dos
    parâmetros manufacturer, model e carrier_plan_type
    """
    if request.method == 'GET':
        manufacturer = request.GET['manufacturer']
        model = request.GET['model']
        carrier_plan_type = request.GET['carrier_plan_type']
        context = {}
        phones = Phone.objects.all()

        # Aplica os filtros aos registros encontrados
        if manufacturer:
            phones = phones.filter(manufacturer__name=manufacturer)
        if model:
            phones = phones.filter(model__icontains=model)
        if carrier_plan_type:
            phones = phones.filter(carrier_plan_type=carrier_plan_type)

        if phones:
            context['phones'] = phones
        else:
            context['none_found'] = True

        context['from_search'] = True
        return render(request, 'inventory.html', context)

    else:
        return HttpResponse(status=501)


def inventory(request):
    """
    A view de exibição dos registros de aparelhos.
    """
    if request.method == 'GET':
        context = {}
        phones = Phone.objects.all()
        
        if phones:
            context['phones'] = phones
        else:
            context['none_found'] = True

        return render(request, 'inventory.html', context)
    
    else:
        return HttpResponse(status=501)

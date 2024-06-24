from django.shortcuts import render

# En contacto/views.py

from django.shortcuts import render

def contact_list(request):
    return render(request, 'contacto/contact_list.html')


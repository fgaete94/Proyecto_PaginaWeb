from django.shortcuts import render
from .models import Producto

# Create your views here.

def product_list(request):
    product = Producto.objects.all()
    context ={'product': product}
    return render (request,'productos/product_list.html',context)
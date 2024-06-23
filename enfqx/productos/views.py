from django.shortcuts import redirect, render
from .models import Producto
from .forms import ProductoForm

# Create your views here.

def product_list(request):
    product = Producto.objects.all()
    context ={'product': product}
    return render (request,'productos/product_list.html',context)

def agregar_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('product_list')
        else:
            form = ProductoForm()
        return render(request,'productos/agregar_producto.html',{'form':form})
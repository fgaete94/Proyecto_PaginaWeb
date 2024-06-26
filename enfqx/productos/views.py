from django.shortcuts import redirect, render
from .models import Producto
from .forms import ProductoForm
import hashlib
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import RegistroForm

# Create your views here.

def product_list(request):
    product = Producto.objects.all()
    context ={'product': product}
    return render (request,'productos/product_list.html',context)

def agregar_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('product_list')
    else:
        form = ProductoForm()
    return render(request,'productos/agregar_producto.html',{'form':form})

def registrar_usuario_seguro(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Cuenta creada para {username}!')
            return redirect('index')
    else:
        form = RegistroForm()
    return render(request, 'productos/crear_usuario.html', {'form': form})
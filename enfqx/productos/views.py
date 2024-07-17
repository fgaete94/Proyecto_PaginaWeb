from django.shortcuts import redirect, render, get_object_or_404
from .models import Producto,Carrito
from .forms import ProductoForm
import hashlib
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import RegistroForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
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



@csrf_exempt
@require_POST
def add_to_cart(request, product_id):
    if not request.user.is_authenticated:
        return JsonResponse({'message': 'Debe iniciar sesión para agregar productos al carrito.'}, status=401)

    product = get_object_or_404(Producto, id=product_id)
    cart_item, created = Carrito.objects.get_or_create(user=request.user, producto=product)

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        if not created:
            cart_item.cantidad += 1
            cart_item.save()

        return JsonResponse({'message': 'Producto agregado al carrito correctamente.'})

    return redirect('cart_detail')

@login_required
def cart_detail(request):
    cart_items = Carrito.objects.filter(user=request.user)
    total = sum(item.producto.price * item.cantidad for item in cart_items)
    context = {'cart_items': cart_items, 'total': total}
    return render(request, 'productos/cart_detail.html', context)

@login_required
def remove_from_cart(request, cart_item_id):
    cart_item = get_object_or_404(Carrito, id=cart_item_id, user=request.user)
    cart_item.delete()
    return redirect('cart_detail')

@login_required
def index(request):
    return render(request, 'pagina/index.htm')


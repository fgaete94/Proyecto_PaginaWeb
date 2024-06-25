from django.shortcuts import render
from publicacion.models import Post 
from .models import Colab,Auth

# Create your views here.

def index(request):
    recent_posts = Post.objects.order_by('-created_date')[:4]
    context = {'recent_posts': recent_posts}
    return render (request,'pagina/index.htm', context)

def colaboradores(request):
    colab = Colab.objects.all()
    context ={'colab': colab}
    return render (request,'pagina/colaboradores.html',context)

def autoras(request):
    auth = Auth.objects.all()
    context ={'auth': auth}
    return render (request,'pagina/quienes_somos.html',context)
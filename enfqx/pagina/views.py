from django.shortcuts import render
from publicacion.models import Post 
from .models import Colaboradores,Autoras

# Create your views here.

def index(request):
    recent_posts = Post.objects.order_by('-created_date')[:4]
    context = {'recent_posts': recent_posts}
    return render (request,'pagina/index.htm', context)

def colaboradores(request):
    colaboradores = Colaboradores.objects.all()
    context ={'colaboradores': colaboradores}
    return render (request,'pagina/colaboradores.html',context)

def autoras(request):
    autoras = Autoras.objects.all()
    context ={'autoras': autoras}
    return render (request,'pagina/quienes_somos.html',context)
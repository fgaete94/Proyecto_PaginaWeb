from django.shortcuts import render
from publicacion.models import Post 

# Create your views here.

def index(request):
    recent_posts = Post.objects.order_by('-created_date')[:4]
    context = {'recent_posts': recent_posts}
    return render (request,'pagina/index.htm', context)


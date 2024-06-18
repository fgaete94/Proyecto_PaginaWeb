from django.shortcuts import render,get_object_or_404
from django.utils import timezone
from .models import Post

# Create your views here.

def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    context ={'posts': posts}
    return render (request,'publicacion/post_list.html',context)

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    context = {'post': post}
    return render(request, 'publicacion/post_detail.html',context)
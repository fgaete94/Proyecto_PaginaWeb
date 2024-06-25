from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactoForm

def contacto(request):
    if request.method == "POST":
        form = ContactoForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.save()
            messages.success(request, "Tu consulta ha sido enviada exitosamente.")
            return redirect('contacto')  
    else:
        form = ContactoForm()
    return render(request, 'contacto/contacto.html', {'form': form})


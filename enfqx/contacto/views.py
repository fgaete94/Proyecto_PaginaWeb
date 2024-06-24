from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactoForm

def contacto_nuevo(request):
    if request.method == "POST":
        form = ContactoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Tu consulta ha sido enviada exitosamente.")
            return redirect('contacto_nuevo')  
    else:
        form = ContactoForm()
    return render(request, 'contacto/contacto_form.html', {'form': form})

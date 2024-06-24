# En contacto/forms.py

from django import forms
from .models import Contacto

class ContactoForm(forms.ModelForm):
    class Meta:
        model = Contacto
        fields = ['nombre', 'apellido', 'rut', 'correo_electronico', 'consulta']


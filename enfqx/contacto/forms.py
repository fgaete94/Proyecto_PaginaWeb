# En contacto/forms.py

from django import forms
from .models import Contacto

class ContactoForm(forms.ModelForm):
    class Meta:
        model = Contacto
        fields = ['nombre', 'apellido', 'rut', 'correo_electronico', 'consulta']

    nombre = forms.CharField(label='Nombre', max_length=100)
    apellido = forms.CharField(label='Apellido', max_length=100)
    rut = forms.CharField(label='RUT', max_length=20)
    correo_electronico = forms.EmailField(label='Correo Electrónico', max_length=100)
    consulta = forms.CharField(label='Escribe tu consulta', widget=forms.Textarea)

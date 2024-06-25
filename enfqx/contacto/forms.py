# # En contacto/forms.py

# from django import forms
# from .models import Contacto

# class ContactoForm(forms.ModelForm):
#     class Meta:
#         model = Contacto
#         fields = ['nombre', 'apellido', 'rut', 'correo_electronico', 'consulta']

from django import forms
from .models import Contacto

class ContactoForm(forms.ModelForm):
    class Meta:
        model = Contacto
        fields = ['nombre', 'apellido', 'rut', 'correo_electronico', 'consulta']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre'}),
            'apellido': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Apellido'}),
            'rut': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '11111111-1'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'name@example.com'}),
            'consulta': forms.Textarea(attrs={'class': 'form-control', 'rows': 8, 'placeholder': 'Escribe tu consulta'}),
        }
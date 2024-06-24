from django.db import models
from django.conf import settings


class Contacto(models.Model):
    nombre = models.CharField(label='Nombre', max_length=100)
    apellido = models.CharField(label='Apellido', max_length=100)
    rut = models.CharField(label='RUT', max_length=20)
    correo_electronico = models.EmailField(label='Correo Electrónico', max_length=100)
    consulta = models.CharField(label='Escribe tu consulta', widget=models.Textarea)
    
    def __str__(self):
        return self.nombre

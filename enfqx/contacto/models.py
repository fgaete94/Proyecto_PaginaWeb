from django.db import models
from django.conf import settings


class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    rut = models.CharField(max_length=20)
    correo_electronico = models.EmailField(max_length=100)
    consulta = models.TextField()
    
    def __str__(self):
        return self.nombre

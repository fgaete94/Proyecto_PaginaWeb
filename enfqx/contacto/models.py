# contacto/models.py

from django.db import models

class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    rut = models.CharField(max_length=20)
    correo_electronico = models.EmailField(max_length=100)
    consulta = models.TextField()

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

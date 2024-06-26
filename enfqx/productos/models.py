from django.db import models
from django.conf import settings
import hashlib

# Create your models here.

class Producto(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.ImageField(null=True)
    price = models.FloatField()

    def __str__(self):
        return self.name


class Usuario(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=64)

    def save(self, *args, **kwargs):
        if not self.pk:  # Si el objeto es nuevo, generar hash de la contraseña
            self.contraseña_hash = hashlib.sha256(self.contraseña_hash.encode()).hexdigest()
        super().save(*args, **kwargs)
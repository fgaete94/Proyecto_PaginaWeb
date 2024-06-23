from django.db import models
from django.conf import settings


# Create your models here.

class Producto(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.ImageField(null=True)
    price = models.FloatField()

    def __str__(self):
        return self.name



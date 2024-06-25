from django.db import models

# Create your models here.

class Colab(models.Model):
    name = models.CharField(max_length=200)
    text = models.TextField()
    image = models.ImageField(null=True)


    def __str__(self):
        return self.name

class Auth(models.Model):
    name = models.CharField(max_length=200)
    text = models.TextField()
    image = models.ImageField(null=True)


    def __str__(self):
        return self.name

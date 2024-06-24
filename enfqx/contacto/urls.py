# En contacto/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('contacto/', views.contact_list, name='contact_list'),
]

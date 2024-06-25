from django.urls import path
from pagina import views

urlpatterns = [
    path('', views.index, name='index'),
    path('colaboradores/', views.colaboradores, name='colaboradores'),
    path('quienes_somos/', views.autoras, name='quienes_somos'),
]
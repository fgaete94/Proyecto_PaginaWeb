from django.urls import path
from productos import views

urlpatterns = [
    path('', views.product_list, name='product_list'),
    path('agregar_producto/',views.agregar_producto,name='agregar_producto'),
    path('crear_usuario/', views.registrar_usuario_seguro, name='registrar'),
]
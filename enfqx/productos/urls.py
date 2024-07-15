from django.urls import path
from productos import views

urlpatterns = [
    path('', views.product_list, name='product_list'),
    path('agregar_producto/',views.agregar_producto,name='agregar_producto'),
    path('crear_usuario/', views.registrar_usuario_seguro, name='registrar'),
    path('add_to_cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.cart_detail, name='cart_detail'),
    path('remove_from_cart/<int:cart_item_id>/', views.remove_from_cart, name='remove_from_cart'),
]
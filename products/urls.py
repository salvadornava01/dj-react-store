from django.urls import path
from .views import ProductListView, ProductDetailView, AddToCartView

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('productdetail/<str:pk>', ProductDetailView.as_view(), name='product-detail'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart')
]

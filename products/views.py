from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Product

# third party imports
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from .serializers import ProductSerializer, CartProducterializer


class ProductListView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()    

class AddToCartView(APIView):
    # permission_classes = (IsAdminUser, )
    def post(self, request, *args, **kwargs):
        print(request)
        product_id = request.data.get('product_id', None)
        if product_id is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id)
        if not product.available:
            return Response({"message": "Producto agotado"}, status=HTTP_400_BAD_REQUEST)

        serializer = CartProducterializer(product)
        
        return Response(serializer.data)
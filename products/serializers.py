from rest_framework import serializers

from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'title', 'category', 'description', 'price', 'available','image_url', 'id'
        )

class CartProducterializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'title', 'price', 'image_url', 'id'
        )
from rest_framework import serializers

from .models import Client, Adress, Order

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = (
            'name', 'phone', 'email'
        )

class AdressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adress
        fields = (
            'calle', 'colonia', 'ciudad', 'estado', 'cp'
        )

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'client', 
            'adress', 
            'status_orden', 
            'payment_method', 
            'payment_order_id',
            'total_amount', 
            'divisa', 
            'client_msg',
            'oxxo_ref',
            'banco_transf',
            'clabe_transf',
            'id'
        )
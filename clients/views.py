import json
from django.core.serializers import serialize
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Client, Adress, Order
from products.models import Product
from .serializers import ClientSerializer, AdressSerializer, OrderSerializer
from .payment_functions import conekta_try_payment

# third party imports
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

class CreateOrderView(APIView):
    def post(self, request, *args, **kwargs):
        cart_products_ids = request.data['cart_data'].keys()
        cart_products_list = []
        total_amount = 0
        for prod_id in cart_products_ids:
            cart_products_list.append(request.data['cart_data'][prod_id])
            total_amount += request.data['cart_data'][prod_id]['quantity'] * Product.objects.get(id=prod_id).price
        client_data = request.data['client_data']
        # If user is authenticated vía django auth or token auth
        if any([request.user.is_authenticated, 'token' in request.data]):
            if request.user.is_authenticated:
                actual_client = Client.objects.get(user = request.user)
            else:
                actual_user = Token.objects.get(key=request.data['token']).user
                actual_client = Client.objects.get(user = actual_user)
            actual_adress = Adress.objects.get(client=actual_client, default_adress=True) 
        # Otherwise, create a new client, with anonymous user
        else:
            # Create a client instance and save it to de db
            actual_client = Client.objects.create(
                user = None,
                name = client_data['nombrecomp'],
                phone = client_data['telefono'],
                email = client_data['email']
            )
            # Create an adress instance and save it to de db
            actual_adress = Adress.objects.create(
                client = actual_client,
                calle = client_data['calle'],
                colonia = client_data['colonia'],
                ciudad = client_data['ciudad'],
                estado = client_data['estado'],
                cp = client_data['cp']
            )
        # Create an Order instance and save it to de db
        actual_order = Order.objects.create(
            client = actual_client,
            adress = actual_adress,
            status_orden = "order_initiated",
            cart_json = json.dumps(request.data['cart_data']),
            total_amount = total_amount
        )
        # Add products objs to actual order
        for prod_id in cart_products_ids:
            actual_order.products.add(prod_id)
        return Response({'order_id':actual_order.id},status=HTTP_200_OK)

class GetUserData(APIView):
    def post(self, request, *args, **kwargs):
        token = request.data['token']
        user_token = get_object_or_404(Token, key=token)
        actual_user = user_token.user
        # import pdb
        # pdb.set_trace()
        try:
            actual_client = Client.objects.get(user = actual_user)
            actual_adress = Adress.objects.get(client=actual_client, default_adress=True) 
            client_serializer = ClientSerializer(actual_client)
            adress_serialzier = AdressSerializer(actual_adress)
            resp = {'client_data':client_serializer.data, 'address_data':adress_serialzier.data}
            return Response(resp, status=HTTP_200_OK)
        except:
            resp = {
                'message':['Tu cuenta no posee datos de contacto asociados, por favor ve a tu cuenta y registra tus datos de contacto para continuar']
                }
            return Response(resp, status=HTTP_400_BAD_REQUEST)

class PaymentOrder(APIView):
    def get(self, request, *args, **kwargs):
        order_id = request.query_params.get('order_id', None)
        if order_id == None:
            return Response(status=HTTP_400_BAD_REQUEST)
        actual_order = get_object_or_404(Order, id=order_id)
        actual_adress = actual_order.adress
        actual_client = actual_order.client
        actual_cart = json.loads(actual_order.cart_json)
        order_serializer = OrderSerializer(actual_order)
        adress_serializer = AdressSerializer(actual_adress)
        client_serializer = ClientSerializer(actual_client)
        response_data = {
            'order_detail': order_serializer.data,
            'cart_detail': actual_cart,
            'adress_detail': adress_serializer.data,
            'client_detail': client_serializer.data
        }
        return Response(response_data, status=HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        order_id = request.data.get('order_id', None)
        payment_method = request.data.get('payment_method', None)
        card_token = request.data.get('token', None)
        if order_id == None:
            return Response(status=HTTP_400_BAD_REQUEST)
        actual_order = get_object_or_404(Order, id=order_id)
        actual_adress = actual_order.adress
        actual_client = actual_order.client
        actual_cart = json.loads(actual_order.cart_json)
        conekta_response = conekta_try_payment( 
            {
                'actual_client': actual_client,
                'actual_adress': actual_adress,
                'actual_cart': actual_cart,
                'order_id': actual_order.id
            }, payment_method, card_token)
        if conekta_response['errors'] is not None:
            # Hanle error, and response
            print(conekta_response['errors'])
            client_message = conekta_response['errors']['details'][0]['message']
            actual_order.status_orden = 'payment_failed'
            actual_order.save(update_fields=['status_orden'])
            return Response(client_message, status=HTTP_400_BAD_REQUEST)
        else:
            # Handle correct response
            conekta_order = conekta_response['order']
            print(conekta_order)
            if payment_method == 'card':
                actual_order.oxxo_ref = 'N/A'
                actual_order.banco_transf = 'N/A'
                actual_order.clabe_transf = 'N/A'
            elif payment_method == 'oxxo_cash':
                actual_order.oxxo_ref = conekta_order.charges[0].payment_method.reference
                actual_order.banco_transf = 'N/A'
                actual_order.clabe_transf = 'N/A'
            else:
                actual_order.oxxo_ref = 'N/A'
                actual_order.banco_transf = conekta_order.charges[0].payment_method.receiving_account_bank
                actual_order.clabe_transf = conekta_order.charges[0].payment_method.receiving_account_number
            actual_order.status_orden = conekta_order.payment_status
            actual_order.payment_order_id = conekta_order.id
            actual_order.divisa = conekta_order.currency
            actual_order.payment_method = payment_method
            actual_order.save(update_fields=[
                'oxxo_ref',
                'banco_transf',
                'clabe_transf',
                'status_orden',
                'payment_order_id',
                'divisa',
                'payment_method'
            ])
            return Response(conekta_order.id, status=HTTP_200_OK)

# Account Dashboard
class AccountData(APIView):
    def get(self, request, *args, **kwargs):
        token = request.query_params.get('token', None)
        user_token = get_object_or_404(Token, key=token)
        actual_user = user_token.user
        try:
            actual_client = Client.objects.get(user = actual_user)
            actual_adress = Adress.objects.get(client=actual_client, default_adress=True) 
            all_orders = Order.objects.filter(client=actual_client)
            client_serializer = ClientSerializer(actual_client)
            adress_serialzier = AdressSerializer(actual_adress)
            #Get all the orders related to the user
            order_serializer = OrderSerializer(all_orders, many=True)
            resp = {
                'client_data':client_serializer.data,
                'address_data':adress_serialzier.data,
                'all_orders':order_serializer.data
                }
            return Response(resp, status=HTTP_200_OK)
        except:
            resp = {
                'message':['Es necesario que registres tus datos de contacto y dirección de envío para completar tu perfil y puedas realizar tus órdenes']
                }
            return Response(resp, status=HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        if 'token' not in request.data:
            resp = {
                'message':['Debes iniciar sesión para realizar esta acción']
                }
            return Response(resp, status=HTTP_400_BAD_REQUEST)
        
        token = request.data['token']
        user_token = get_object_or_404(Token, key=token)
        actual_user = user_token.user
        model_to_save = request.data['model_to_save'] # model_to_save can be client or address 
        if model_to_save == 'client_data':
            # Check if a client asociated with this user already exists
            # Create a client instance and save it to de db
            client_data = request.data['client_data']
            new_client = Client.objects.create(
                user = actual_user,
                name = client_data['nombrecomp'],
                phone = client_data['telefono'],
                email = client_data['email']
            )
            resp = {
                'message':['Se han guardado tus datos con éxito!']
                }
            return Response(resp, status=HTTP_200_OK)
        elif model_to_save == 'address_data':
            print('address_data')
            print(request.data['address_data'])
            # Create an adress instance and save it to de db
            actual_client = Client.objects.get(user = actual_user)
            new_adress = Adress.objects.create(
                client = actual_client,
                calle = client_data['calle'],
                colonia = client_data['colonia'],
                ciudad = client_data['ciudad'],
                estado = client_data['estado'],
                cp = client_data['cp']
            )
            resp = {
                'message':['Se ha guardado tu dirección con éxito!']
                }
            return Response(resp, status=HTTP_400_BAD_REQUEST)
        return Response(status=HTTP_200_OK)
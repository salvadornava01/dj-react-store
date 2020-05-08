import conekta 
import os
conekta.locale = 'es'
conekta.api_key = os.environ.get('CONEKTA_API_KEY')
conekta_public_key = os.environ.get('CONEKTA_PUBLIC_KEY')
conekta.api_version = "2.0.0"

def conekta_try_payment(client_order_data, payment_method, token=None):
    if payment_method == 'card':
        client_msg = 'Tu pago ha sido procesado con éxito, dentro de los próximos minutos recibirás una confirmación a tu correo electrónico. Gracias por tu preferencia.'
    elif payment_method == 'oxxo_cash':
        client_msg = 'Tu ficha de pago OxxoPay ha sido creada con éxito'
    else: # spei
        client_msg = 'Tu ficha de transferencia ha sido creada con éxito'
    
    client_data = client_order_data['actual_client'] 
    adress_data = client_order_data['actual_adress'] 
    cart_data = client_order_data['actual_cart'] 
    products_array = []
    for key in cart_data: 
        products_array.append(
            {
                'name':cart_data[key]['product_data']['title'], 
                'unit_price':cart_data[key]['product_data']['price']*100, 
                'quantity':cart_data[key]['quantity']
            })

    
    try:
        order = conekta.Order.create({
            "line_items": products_array,
            "shipping_lines": [{
                "amount": 0,
                "carrier": "FEDEX"
            }], #shipping_lines - physical goods only
            "currency": "MXN",
            "customer_info": {
                "name": client_data.name,
                "phone": client_data.phone,
                "email": client_data.email,
                "corporate": False,      },
            "shipping_contact":{
            "address": {
                "street1": adress_data.calle,
                "street2": adress_data.colonia,
                "postal_code": adress_data.cp,
                "country": "MX",
                "city":adress_data.ciudad,
                "state":adress_data.estado
            } #shipping_contact - required only for physical goods
            },
            "metadata": { "Order_db_id": str(client_order_data['order_id']) },
            "charges":[{
            "payment_method": {
                "type": payment_method,
            "token_id": token      }  
            }]
        })

        response = {
            'order': order,
            'errors':None,
            'client_msg':client_msg
        }
        return response

    except conekta.ConektaError as error:
        errors=error.__dict__['error_json']
        client_msg = errors['details'][0]['message']
        response = {
            'order': {},
            'errors':errors,
            'client_msg':client_msg
        }
        return response
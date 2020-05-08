import uuid
from django.db import models
from django.conf import settings
from django.utils.encoding import smart_text
from products.models import Product
# Create your models here.
 
class Client(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=120, null=True, blank=False)
    phone = models.CharField(max_length=10, null=True, blank=False) 
    email = models.EmailField()
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False, )
    updated = models.DateTimeField(auto_now_add=False, auto_now=True) 

    def __str__(self):
        return smart_text(self.name)

class Adress(models.Model):
    client = models.ForeignKey(Client, on_delete = models.CASCADE)
    calle = models.CharField(max_length=120, null=True, blank=False)
    colonia = models.CharField(max_length=120, null=True, blank=False)
    ciudad = models.CharField(max_length=120, null=True, blank=False)
    estado = models.CharField(max_length=30, null=True, blank=False)
    cp = models.CharField(max_length=5, null=True, blank=False)
    default_adress = models.BooleanField(default=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return smart_text(self.calle) + ' | Cliente: ' + self.client.name

class Order(models.Model):
    client = models.ForeignKey(Client, on_delete = models.CASCADE)
    adress = models.ForeignKey(Adress, on_delete=models.CASCADE)
    status_orden = models.CharField(max_length=40, null=True, blank=True) #Datos devueltos por Conekta
    payment_method = models.CharField(max_length=120, null=True, blank=True) #Datos devueltos por Conekta
    payment_order_id = models.CharField(max_length=120, null=True, blank=True)   #Datos devueltos por Conekta
    cart_json = models.TextField(blank=True)
    products = models.ManyToManyField(Product)
    total_amount = models.IntegerField(null=True, blank=True) #Datos devueltos por Conekta
    divisa = models.CharField(max_length=100, null=True, blank=True) #Datos devueltos por Conekta
    client_msg = models.TextField(blank=True)
    oxxo_ref = models.CharField(max_length=100, null=True, blank=True)
    banco_transf = models.CharField(max_length=100, null=True, blank=True)
    clabe_transf = models.CharField(max_length=100, null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)

    def __str__(self):
        return smart_text(self.client.name)
from django.contrib import admin
from .models import Client, Adress, Order
# Register your models here.

class ClientAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'user')
    class Meta:
        model = Client
admin.site.register(Client, ClientAdmin)

class AdressAdmin(admin.ModelAdmin):
    class Meta:
        model = Adress
admin.site.register(Adress, AdressAdmin)

class OrderAdmin(admin.ModelAdmin):
    search_fields=('client__name', 'client__email', 'client__user__username')
    list_display = ('__str__', 'timestamp', 'client')
    class Meta:
        model = Order
admin.site.register(Order, OrderAdmin)
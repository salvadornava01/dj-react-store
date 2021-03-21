from django.urls import path
from .views import CreateOrderView, GetUserData, PaymentOrder, AccountData

urlpatterns = [
    path('create-order/', CreateOrderView.as_view(), name='create-order'),
    path('get-user-data/', GetUserData.as_view(), name='get-user-data'),
    path('get-order-data/', PaymentOrder.as_view(), name='get-order-data'),
    path('account-data/', AccountData.as_view(), name='account-data'),
]

from django.db import models
from django.conf import settings
# from django.contrib.auth import 
import uuid

class Product(models.Model):
    title = models.CharField(max_length=50, blank=False)
    category = models.CharField(max_length=50, blank=False)
    description = models.TextField(blank=False)
    price = models.IntegerField()
    available = models.BooleanField(default= True)
    image_url = models.CharField(max_length=500, blank=False)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.title + ', Precio: $' + str(self.price) + ' | ID: ' + str(self.id)
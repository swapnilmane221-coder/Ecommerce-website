from django.contrib import admin
from .models import category, product, userProfile, Order, OrderItem

admin.site.register(category)
admin.site.register(product)  
admin.site.register(userProfile)
admin.site.register(Order)
admin.site.register(OrderItem)


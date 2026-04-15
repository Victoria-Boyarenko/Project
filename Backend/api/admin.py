from django.contrib import admin
from .models import Category, Product, Favorite, Review

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Favorite)
admin.site.register(Review)
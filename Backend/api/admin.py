from django.contrib import admin
from .models import Category, Product, Favorite, Review, ChatMessage, Like

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Favorite)
admin.site.register(Like)
admin.site.register(Review)
admin.site.register(ChatMessage)
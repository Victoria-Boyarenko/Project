from django.contrib import admin
from .models import Category, Product, Favorite, Review, ChatMessage, Like

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Favorite)
admin.site.register(Like)
admin.site.register(Review)

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'user', 'text', 'is_from_admin', 'created_at')
    list_filter = ('is_from_admin',)
    search_fields = ('text', 'user__username')
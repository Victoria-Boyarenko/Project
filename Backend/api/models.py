from django.conf import settings
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='products'
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products'
    )
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    likes = models.IntegerField(default=0)

    fandom = models.CharField(max_length=100, blank=True, default='')

    image = models.URLField(
        default='https://i.pinimg.com/736x/af/fb/88/affb88d66beb1762e43d6adde37f6560.jpg'
    )
    images = models.JSONField(default=list, blank=True)
    link = models.URLField(default='https://kaspi.kz')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Like(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='likes'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='user_likes'
    )

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f'{self.user} likes {self.product}'


class Favorite(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='favorites'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='favorites'
    )

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f'{self.user} -> {self.product}'


class Review(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rating = models.IntegerField(default=0)
    comment = models.TextField(blank=True, default='')

    def __str__(self):
        return f'{self.user} review for {self.product}'


class ChatMessage(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='chat_messages'
    )
    text = models.TextField()
    is_from_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        sender = 'Admin' if self.is_from_admin else self.user.username
        return f'{sender}: {self.text[:30]}'
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Category, Product, Favorite, ChatMessage, Like


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(
            username=attrs.get('username'),
            password=attrs.get('password')
        )
        if not user:
            raise serializers.ValidationError('Invalid username or password')
        attrs['user'] = user
        return attrs


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductModelSerializer(serializers.ModelSerializer):
    categoryId = serializers.PrimaryKeyRelatedField(
        source='category',
        queryset=Category.objects.all()
    )
    owner = serializers.StringRelatedField(read_only=True)
    isFavorite = serializers.SerializerMethodField()
    isLiked = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'price',
            'rating',
            'image',
            'images',
            'link',
            'likes',
            'fandom',
            'categoryId',
            'owner',
            'created_at',
            'isFavorite',
            'isLiked',
        ]

    def get_isFavorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, product=obj).exists()
        return False

    def get_isLiked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, product=obj).exists()
        return False


class FavoriteSerializer(serializers.ModelSerializer):
    product = ProductModelSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'product']


class UserProfileSerializer(serializers.ModelSerializer):
    favorites = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'favorites']

    def get_favorites(self, obj):
        favorites = Favorite.objects.filter(user=obj).select_related('product')
        request = self.context.get('request')
        products = [fav.product for fav in favorites]
        return ProductModelSerializer(products, many=True, context={'request': request}).data


class ChatMessageSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'username', 'text', 'is_from_admin', 'created_at']
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Product, Category, Favorite, ChatMessage, Like
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    LogoutSerializer,
    ProductModelSerializer,
    CategoryModelSerializer,
    FavoriteSerializer,
    UserProfileSerializer,
    ChatMessageSerializer,
)


@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': RegisterSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.validated_data['user']
    refresh = RefreshToken.for_user(user)

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    })


@api_view(['POST'])
def logout_view(request):
    serializer = LogoutSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    try:
        token = RefreshToken(serializer.validated_data['refresh'])
        token.blacklist()
        return Response({'detail': 'Logged out successfully'})
    except Exception:
        return Response(
            {'detail': 'Invalid refresh token'},
            status=status.HTTP_400_BAD_REQUEST
        )


class ProfileAPIView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = UserProfileSerializer(request.user, context={'request': request})
        return Response(serializer.data)


class ProductListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        products = Product.objects.all().order_by('-id')
        serializer = ProductModelSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = ProductModelSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return None

    def get(self, request, pk):
        product = self.get_object(pk)
        if not product:
            return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductModelSerializer(product, context={'request': request})
        return Response(serializer.data)

    def patch(self, request, pk):
        product = self.get_object(pk)
        if not product:
            return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = ProductModelSerializer(
            product,
            data=request.data,
            partial=True,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product = self.get_object(pk)
        if not product:
            return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Category.objects.all().order_by('id')
        serializer = CategoryModelSerializer(categories, many=True)
        return Response(serializer.data)


class CategoryDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CategoryModelSerializer(category)
        return Response(serializer.data)


class FavoriteListAPIView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        favorites = Favorite.objects.filter(user=request.user).select_related('product')
        serializer = FavoriteSerializer(favorites, many=True, context={'request': request})
        return Response(serializer.data)


class ToggleFavoriteAPIView(APIView):
    def post(self, request, pk):
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        favorite = Favorite.objects.filter(user=request.user, product=product).first()

        if favorite:
            favorite.delete()
            return Response({'isFavorite': False})
        else:
            Favorite.objects.create(user=request.user, product=product)
            return Response({'isFavorite': True})


class ToggleLikeAPIView(APIView):
    def post(self, request, pk):
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        like = Like.objects.filter(user=request.user, product=product).first()

        if like:
            like.delete()
            if product.likes > 0:
                product.likes -= 1
                product.save()
            return Response({'isLiked': False, 'likes': product.likes})
        else:
            Like.objects.create(user=request.user, product=product)
            product.likes += 1
            product.save()
            return Response({'isLiked': True, 'likes': product.likes})


class ChatMessageListCreateAPIView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        messages = ChatMessage.objects.filter(user=request.user)
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        text = request.data.get('text', '').strip()

        if not text:
            return Response(
                {'detail': 'Text is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        message = ChatMessage.objects.create(
            user=request.user,
            text=text,
            is_from_admin=False
        )
        serializer = ChatMessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AdminReplyAPIView(APIView):
    def post(self, request, user_id):
        if not request.user.is_authenticated or not request.user.is_staff:
            return Response(
                {'detail': 'Admin only'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            target_user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        text = request.data.get('text', '').strip()

        if not text:
            return Response(
                {'detail': 'Text is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        message = ChatMessage.objects.create(
            user=target_user,
            text=text,
            is_from_admin=True
        )
        serializer = ChatMessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
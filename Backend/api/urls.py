from django.urls import path
from .views import (
    register_view,
    login_view,
    logout_view,
    ProfileAPIView,
    ProductListAPIView,
    ProductDetailAPIView,
    CategoryListAPIView,
    CategoryDetailAPIView,
    FavoriteListAPIView,
    ToggleFavoriteAPIView,
    ToggleLikeAPIView,
    ChatMessageListCreateAPIView,
    AdminReplyAPIView,
)

urlpatterns = [
    path('register/', register_view),
    path('login/', login_view),
    path('logout/', logout_view),
    path('me/', ProfileAPIView.as_view()),

    path('products/', ProductListAPIView.as_view()),
    path('products/<int:pk>/', ProductDetailAPIView.as_view()),
    path('products/<int:pk>/like/', ToggleLikeAPIView.as_view()),
    path('products/<int:pk>/favorite/', ToggleFavoriteAPIView.as_view()),

    path('categories/', CategoryListAPIView.as_view()),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view()),

    path('favorites/', FavoriteListAPIView.as_view()),

    path('chat/messages/', ChatMessageListCreateAPIView.as_view()),
    path('chat/admin-reply/<int:user_id>/', AdminReplyAPIView.as_view()),
]
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from django.urls import path

urlpatterns = [
    path("login/", TokenObtainPairView.as_view()),
    path("logout/", TokenRefreshView.as_view())
]
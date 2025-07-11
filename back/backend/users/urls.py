from django.contrib.auth import views as authViews
from django.urls import path

urlpatterns = [
    path("login/", authViews.LoginView.as_view()),
    path("logout/", authViews.LoginView.as_view())
]
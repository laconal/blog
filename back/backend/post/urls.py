from django.urls import path
from . import views

urlpatterns = [
    path('', views.Posts.as_view({"get": "all"}))
]
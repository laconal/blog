from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.Posts, basename = "posts")
router.register(r'comments/', views.Posts, basename="comments")

urlpatterns = router.urls
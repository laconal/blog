from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post, Comment
from .serializers import ItemSerializer, CommentSerializer
from pydantic import BaseModel, PositiveInt

User = get_user_model()

class Posts(APIView):
    
    permission_classes = [AllowAny]
    def get(self, request):
        posts = Post.objects.all()
        serializer = 
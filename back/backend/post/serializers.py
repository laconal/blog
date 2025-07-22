from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class ItemSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.username", read_only = True)
    
    comments = serializers.PrimaryKeyRelatedField(
        many = True,
        read_only = True
    )

    class Meta:
        model = Post
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    subMessages = serializers.PrimaryKeyRelatedField(
        many = True,
        read_only = True
    )
    author = serializers.CharField(source="author.username", read_only = True)
    class Meta:
        model = Comment
        fields = "__all__"
        
from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class ItemSerializer(serializers.ModelSerializer):
    def get_commentsAmount(self, obj): return obj.comments.count()

    author = serializers.CharField(source="author.username", read_only = True)
    commentsAmount = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        
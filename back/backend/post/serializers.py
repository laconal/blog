from rest_framework import serializers
from post.models import Post
from django.contrib.auth import get_user_model

User = get_user_model()

class ItemSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.username", read_only = True)
    class Meta:
        model = Post
        fields = "__all__"

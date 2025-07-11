from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from post.models import Post
from post.serializers import ItemSerializer

class Posts(viewsets.ModelViewSet):
    @action(detail = False, methods=["get"])
    def all(self, request):
        orders = Post.objects.all()
        serializer = ItemSerializer(orders, many = True)
        return Response(data = serializer.data, status = 200)
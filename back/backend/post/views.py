from django.shortcuts import render
from rest_framework import status, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post
from .serializers import ItemSerializer, CommentSerializer

class Posts(viewsets.ModelViewSet):
    serializer_class = ItemSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve", "destroy", "partial_update", "getComments"]: permission_classes = [AllowAny]
        else: permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list(self, request):
        objects = Post.objects.all()
        serializer = self.get_serializer(objects, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, pk = None):
        object = get_object_or_404(self.queryset, pk = pk)
        serializer = self.get_serializer(object)
        return Response(data = serializer.data, status = status.HTTP_200_OK)
    
    def destroy(self, request, pk = None):
        object = get_object_or_404(self.queryset, pk = pk)
        object.delete()
        return Response(status=status.HTTP_200_OK)
    
    def partial_update(self, request, pk = None):
        object = get_object_or_404(self.queryset, pk = pk)
        serializer = self.get_serializer(object, data = request.data, partial = True)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(status = status.HTTP_200_OK)
    
    @action(methods=["GET"], detail=True, url_path = "comments")
    def getComments(self, request, pk = None):
        object = get_object_or_404(Post, pk = pk)
        comments = object.comments.all()
        serializer = CommentSerializer(comments, many = True)
        return Response(data = serializer.data, status = status.HTTP_200_OK)

    @action(detail = False, methods = ["get"])
    def oneObject(self, request, pk: int):
        object = Post.object.get(id = pk)
        serializer = self.get_serializer(object)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
from django.shortcuts import render
from rest_framework import status, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post
from .serializers import ItemSerializer

class Posts(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = ItemSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]: permission_classes = [AllowAny]
        else: permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, pk=None):
        object = get_object_or_404(self.queryset, pk = pk)
        serializer = self.get_serializer(object)
        return Response(data = serializer.data, status = status.HTTP_200_OK)
        

    
    @action(detail = False, methods = ["get"])
    def oneObject(self, request, pk: int):
        object = Post.object.get(id = pk)
        serializer = self.get_serializer(object)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
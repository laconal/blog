from django.shortcuts import render
from rest_framework import generics
from rest_framework.serializers import ModelSerializer, ValidationError
from django.contrib.auth import get_user_model
# Create your views here.

User = get_user_model()

class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")
        extraKwargs = {"password": {"write_only": True}}

    def create(self, validatedData):
        user = User(**validatedData)
        user.set_password(validatedData["password"])
        user.save()
        return User
    
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import XOGameSerializer
from .models import XOGame

# Create your views here.

class XOGameView(viewsets.ModelViewSet):
    serializer_class = XOGameSerializer
    queryset = XOGame.objects.all()
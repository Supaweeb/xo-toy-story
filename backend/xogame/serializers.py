from rest_framework import serializers
from .models import XOGame

class XOGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = XOGame
        fields = ('id','name','boardSize','gameplay','date')
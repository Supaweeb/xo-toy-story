from typing import AbstractSet
from django.db import models
from django import forms

# Create your models here.


class XOGame(models.Model):
    name = models.CharField(max_length=120)
    boardSize = models.JSONField(null=True)
    gameplay = models.JSONField(null=True)
    winInRow = models.IntegerField(null=True)
    date = models.DateTimeField(auto_now_add=True, null=True) #  GMT+7

    def _str_(self):
        return self.name

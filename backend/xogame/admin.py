from django.contrib import admin
from .models import XOGame
# Register your models here.

class XOGameAdmin(admin.ModelAdmin):
    list_display = ('id','name','boardSize','winInRow','gameplay','date')

admin.site.register(XOGame,XOGameAdmin)
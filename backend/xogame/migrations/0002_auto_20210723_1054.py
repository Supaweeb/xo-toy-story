# Generated by Django 3.1.4 on 2021-07-23 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('xogame', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='xogame',
            name='date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='xogame',
            name='gameplay',
            field=models.JSONField(null=True),
        ),
    ]
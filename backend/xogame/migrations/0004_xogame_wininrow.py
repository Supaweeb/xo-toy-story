# Generated by Django 3.1.4 on 2021-07-24 10:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('xogame', '0003_xogame_boardsize'),
    ]

    operations = [
        migrations.AddField(
            model_name='xogame',
            name='winInRow',
            field=models.IntegerField(null=True),
        ),
    ]
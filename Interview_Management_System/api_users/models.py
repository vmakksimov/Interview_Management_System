from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.


class Users(models.Model):
    email = models.EmailField(
        null=True,
        blank=True,
        unique=True,
    )

    nickname = models.CharField(max_length=10, unique=True)
    first_name = models.CharField(max_length=10)
    last_name = models.CharField(max_length=10)

    class Meta:
        verbose_name = 'User'

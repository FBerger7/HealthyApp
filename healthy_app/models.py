from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    weight = models.FloatField(default=0)
    height = models.FloatField(default=1)

    def __str__(self):
        return self.weight, self.height


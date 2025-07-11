from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    bookmarked = models.ManyToManyField("post.Post", related_name="bookmarkedPosts", blank = True)

    def __str__(self):
        return self.username
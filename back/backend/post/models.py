from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

subject = [
    ("math", "Math"),
    ("physic", "Physic"),
    ("programming", "Programming")
]

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank = True)
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    subject = models.CharField(choices = subject)
    likes = models.IntegerField(default = 0)
    views = models.IntegerField(default = 0)
    createdDate = models.DateTimeField(auto_created = True, default = timezone.now())
    lastChanges = models.DateTimeField(auto_now = True, blank = True)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name = "comments")
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    likes = models.IntegerField(default = 0)
    createdDate = models.DateTimeField(auto_now_add = True)
    parent = models.ForeignKey(
        "self",
        null = True,
        blank = True,
        related_name = "subMessages",
        on_delete=models.CASCADE
    )
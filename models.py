from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    VISIBILITY_CHOICES = [
        ('everyone', 'Everyone'),
        ('team', 'Team'),
        ('private', 'Private'),
    ]
    
    name = models.CharField(max_length=100)
    visibility = models.CharField(max_length=10, choices=VISIBILITY_CHOICES, default='everyone')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

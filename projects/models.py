from django.db import models
from users.models import User

class Project(models.Model):
    name = models.CharField(max_length=255)
    visible_to = models.CharField(max_length=50, choices=[
        ('Everyone', 'Everyone'),
        ('Team', 'Team'),
        ('Private', 'Private')
    ], default='Everyone')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Component(models.Model):
    project = models.ForeignKey(Project, related_name='components', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    component_type = models.CharField(max_length=10, choices=[('input', 'Input'), ('output', 'Output')])
    pin_number = models.IntegerField()

    def __str__(self):
        return self.name


from rest_framework import serializers
from .models import Project, Component
from users.models import User

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['name', 'component_type', 'pin_number']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'visible_to', 'created_by']
        read_only_fields = ['created_by']


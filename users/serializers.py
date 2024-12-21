from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'date_of_birth', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Hide password in responses
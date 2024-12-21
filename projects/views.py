from django.shortcuts import render
from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer
from .models import Component
from .serializers import ComponentSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.users)  # Save the user who creates the project


class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

    def perform_create(self, serializer):
        # Associate component with the project
        project = self.request.data.get('project')  # Assume project ID is passed in the request
        serializer.save(project_id=project)

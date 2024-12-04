from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Project

@csrf_exempt
def create_account(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        if password == confirm_password:
            user = User.objects.create_user(username=username, email=email, password=password)
            return JsonResponse({"message": "Account created successfully"})
        return JsonResponse({"error": "Passwords do not match"}, status=400)

@csrf_exempt
def add_project(request):
    if request.method == "POST":
        project_name = request.POST.get("name")
        visibility = request.POST.get("visibility")
        user = request.user  # Assuming the user is logged in

        project = Project.objects.create(name=project_name, visibility=visibility, owner=user)
        return JsonResponse({"message": "Project created successfully"})


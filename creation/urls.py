from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.create_account, name='create_account'),
    path('add_project/', views.add_project, name='add_project'),
]

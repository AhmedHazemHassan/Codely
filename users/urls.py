from django.urls import path
from .views import CreateUserView, LoginAPIView

urlpatterns = [
    path('create/', CreateUserView.as_view(), name='create_user'),
    path('login/', LoginAPIView.as_view(), name='login_user'),
]


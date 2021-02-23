from django.urls import path
from .views import current_user, UserList, UpdateUser

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('update_user/<int:pk>/',UpdateUser.as_view())
]
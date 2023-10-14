from django.urls import path
from Interview_Management_System.api_users.views import UserViewSet, LogOutAPIView, LoginAPIView, RegisterView, \
    UsersViewAPI, HomeView

urlpatterns = (
    path('', HomeView.as_view(template_name='base.html'), name='home'),
    path('users-view/', UserViewSet.as_view({'get': 'list'}), name='users view'),
    # path('register/',  RegisterUserAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('logout/', LogOutAPIView.as_view(), name='auth_logout'),
    path('user/', UsersViewAPI.as_view(), name='user_view'),

    # path('api-token-auth/', LoginAPIView.as_view()),


)
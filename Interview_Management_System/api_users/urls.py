from django.urls import path
from Interview_Management_System.api_users.views import UserViewSet, RegisterView, BlacklistTokenUpdateView

urlpatterns = (

    path('users-view/', UserViewSet.as_view({'get': 'list'}), name='users view'),
    # path('register/',  RegisterUserAPIView.as_view(), name='register'),
    # path('login/', LoginAPIView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    # path('logout/', LogOutAPIView.as_view(), name='auth_logout'),
    # path('user/', UsersViewAPI.as_view(), name='user_view'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),name='blacklist')

    # path('api-token-auth/', LoginAPIView.as_view()),


)
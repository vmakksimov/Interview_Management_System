from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.reverse import reverse_lazy

from Interview_Management_System.api_users.serializers import UserSerializer, UserLoginSerializer, RegisterSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import views as rest_logout_view
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework import status
from django.contrib.auth import authenticate
from Interview_Management_System.api_users.utils import generate_access_token


# Create your views here.

# class RegisterUserAPIView(APIView):
#     permission_classes = [AllowAny]
#     # authentication_classes = (TokenAuthentication,)
#     def post(self, request):
#         serializer = UserRegistrationSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             new_user = serializer.save()
#             if new_user:
#                 access_token = generate_access_token(new_user)
#                 data = {'accessToken': access_token,
#                         'email': self.request.data['email'],
#                         'username': self.request.data['username']
#                         }
#                 response = Response(data, status=status.HTTP_201_CREATED)
#                 response.set_cookie(key='accessToken', value=access_token, httponly=True)
#                 return Response(data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class LoginAPIView(APIView):
    serializer_class = UserLoginSerializer
    # authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username',None)
        user_password = request.data.get('password', None)

        if not user_password:
            raise AuthenticationFailed('A user password is needed')

        if not username:
            raise AuthenticationFailed('A username is needed')
        user_instance = authenticate(username=username, password=user_password)

        if not user_instance:
            raise AuthenticationFailed('User not found.')

        if user_instance.is_active:
            user_access_token = generate_access_token(user_instance)
            response = Response()
            response.set_cookie(key='accessToken', value=user_access_token, httponly=False)
            response.data = {
                'accessToken' : user_access_token
            }
            return response
        return Response({
            'message': 'something went wrong'
        })

class LogOutAPIView(APIView):
    # authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        user_token = request.COOKIES.get('accessToken', None)
        response = Response()
        if user_token:
            response = Response()
            response.delete_cookie('accessToken')
            response.data = {
                'message': 'Logged out succesfully'
            }
            return response

        response = Response()
        response.data = {
            'message': 'User is already logged out.'
        }
        return response

class UserViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

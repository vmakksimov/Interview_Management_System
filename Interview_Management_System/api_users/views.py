import jwt
from django.conf import settings
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.reverse import reverse_lazy

from Interview_Management_System.api_users.serializers import UserSerializer, UserLoginSerializer,    UserRegistrationSerializer
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
from django.contrib.auth import authenticate, login
from Interview_Management_System.api_users.tasks import send_email_to_new_user
from Interview_Management_System.api_users.utils import generate_access_token


# Create your views here.

class RegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer
    # authentication_classes = (TokenAuthentication,)
    def post(self, request, format='json'):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # if serializer.is_valid(raise_exception=True):
        #     new_user = serializer.save()
        #     if new_user:
        #         access_token = generate_access_token(new_user)
        #         data = {'accessToken': access_token,
        #                 'email': self.request.data['email'],
        #                 'username': self.request.data['username']
        #                 }
        #         send_email_to_new_user.delay(new_user.email)
        #         response = Response(data, status=status.HTTP_201_CREATED)
        #         response.set_cookie(key='accessToken', value=access_token, httponly=False)
        #         return response
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = RegisterSerializer
#     authentication_classes = (TokenAuthentication,)

# class LoginAPIView(APIView):
#     serializer_class = UserLoginSerializer
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (AllowAny,)
#     # renderer_classes = [TemplateHTMLRenderer]
#     # template_name = 'rest_framework/accounts/login-view.html'
#
#     def get(self, request):
#         return Response(status=status.HTTP_200_OK)
#
#     def post(self, request):
#         username = request.data.get('username',None)
#         user_password = request.data.get('password', None)
#
#         if not user_password:
#             raise AuthenticationFailed('A user password is needed')
#
#         if not username:
#             raise AuthenticationFailed('A username is needed')
#         user_instance = authenticate(request, username=username, password=user_password)
#
#         if not user_instance:
#             raise AuthenticationFailed('User not found.')
#
#         if user_instance.is_active:
#             user_access_token = generate_access_token(user_instance)
#             response = Response()
#             response.set_cookie(key='accessToken', value=user_access_token, httponly=False)
#             response.data = {
#                 'accessToken' : user_access_token
#             }
#             login(request, user_instance)
#             return response
#         return Response({
#             'message': 'something went wrong'
#         })

# class LogOutAPIView(APIView):
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (AllowAny,)
#
#     def get(self, request):
#         user_token = request.COOKIES.get('accessToken', None)
#         if user_token:
#             response = Response()
#             response.delete_cookie('accessToken')
#             response.data = {
#                 'message': 'Logged out succesfully'
#             }
#             return response
#
#         response = Response()
#         response.data = {
#             'message': 'User is already logged out.'
#         }
#         return response



# class UsersViewAPI(APIView):
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (AllowAny,)
#     def get(self, request):
#         user_token = request.COOKIES.get('accessToken')
#         if not user_token:
#             raise AuthenticationFailed('not user')
#         payload = jwt.decode(user_token, settings.SECRET_KEY, algorithms=['HS256'])
#         user = User.objects.filter(id=payload['id']).first()
#         user_serializer = UserRegistrationSerializer(user)
#         return Response(user_serializer.data)

# class HomeView(APIView):
#     template_name = 'rest_framework/base.html'
#     renderer_classes = [TemplateHTMLRenderer]
#     authentication_classes = (TokenAuthentication,)
#
#     def get(self, request):
#         queryset = User.objects.all()
#         return Response({'profiles': queryset})
class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

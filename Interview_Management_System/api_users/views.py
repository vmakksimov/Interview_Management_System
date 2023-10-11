from django.http import HttpResponseRedirect
from django.shortcuts import render
from rest_framework.reverse import reverse_lazy

from Interview_Management_System.api_users.serializers import RegisterSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import views as rest_logout_view
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework import status

# Create your views here.
# class ProfileList(APIView):
#     renderer_classes = [TemplateHTMLRenderer]
#     template_name = 'rest_framework/accounts/profile_list.html'
#
#     def get(self, request):
#         queryset = User.objects.all()
#         return Response({'profiles': queryset})

class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class LoginAPIView(ObtainAuthToken, generics.CreateAPIView):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'accessToken': token.key,
            '_id': user.pk,
            'email': user.email,
            'username': user.username
        })


class LogOutAPIView(rest_logout_view.APIView):
    def get(self, request):
        return self.__perform_logout(request)

    def post(self, request):
        return self.__perform_logout(request)

    @staticmethod
    def __perform_logout(request):
        if request.user.is_anonymous:
            return Response({
                'message': 'no current logged in user'
            })

        request.user.auth_token.delete()
        return Response({
            'message': 'user logged out successfully'
        })

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

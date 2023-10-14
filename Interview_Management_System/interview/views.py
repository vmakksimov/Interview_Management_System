from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
from django.views import generic as views

from Interview_Management_System.interview.models import Interview
from Interview_Management_System.interview.serializers import InterviewSerializer


# Create your views here.
class CreateInterviewView(generics.ListCreateAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer

    # def get(self, request, *args, **kwargs):
    #     posts = Interview.objects.all()
    #     serializer = InterviewSerializer(posts, many=True)
    #     return Response(serializer.data)
    #
    # def post(self, request, *args, **kwargs):
    #     serializer_class = InterviewSerializer(data=request.data)
    #     if serializer_class.is_valid():
    #         serializer_class.save()
    #         return Response({'status': 'ok'}, status=200)
    #     else:
    #         return Response({'error': serializer_class.errors}, status=400)


class InterviewUpdateView (generics.RetrieveUpdateDestroyAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]

    # def get(self, request, pk):
    #     interview = Interview.objects.get(id=pk)
    #     serializer = InterviewSerializer(interview)
    #     return Response(serializer.data)
    #
    # def delete(self, request, pk):
    #     interview = Interview.objects.get(id=pk)
    #     interview.delete()
    #     return Response(status=status.HTTP_200_OK)

class InterviewList(generics.ListAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer




    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     context['hide_context'] = True
    #
    #     return context
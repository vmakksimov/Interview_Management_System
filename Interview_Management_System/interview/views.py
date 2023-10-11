from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from Interview_Management_System.interview.models import Interview
from Interview_Management_System.interview.serializers import InterviewSerializer


# Create your views here.
class CreateInterviewView(APIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer
    # permission_classes = (AllowAny,)
    # parser_classes = [MultiPartParser, JSONParser, FormParser]

    # def pre_save(self, obj):
    #     obj.image = self.request.FILES.get('file')

    def get(self, request, *args, **kwargs):
        posts = Interview.objects.all()
        serializer = InterviewSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer_class = InterviewSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response({'status': 'ok'}, status=200)
        else:
            return Response({'error': serializer_class.errors}, status=400)
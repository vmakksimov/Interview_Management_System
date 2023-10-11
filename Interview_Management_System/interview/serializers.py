from rest_framework import serializers

from Interview_Management_System.interview.models import Interview


class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = '__all__'
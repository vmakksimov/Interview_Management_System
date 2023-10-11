from django.urls import path

from Interview_Management_System.interview.views import CreateInterviewView

urlpatterns = (
    path('create/', CreateInterviewView.as_view(), name='create-interview'),
)
from django.urls import path

from Interview_Management_System.interview.views import CreateInterviewView, InterviewList, InterviewUpdateView

urlpatterns = (
    path('create/', CreateInterviewView.as_view(), name='create-interview'),
    path('all/', InterviewList.as_view(), name='all-interviews'),
    path('update/<int:pk>', InterviewUpdateView.as_view(), name='all-interviews'),
)
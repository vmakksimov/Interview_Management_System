from django.urls import path

from Interview_Management_System.interview.views import CreateInterviewView, InterviewList, InterviewUpdateView
from django.views.generic import TemplateView
urlpatterns = (
    path('', TemplateView.as_view(template_name="base.html")),
    path('create/', CreateInterviewView.as_view(), name='create-interview'),
    path('all/', InterviewList.as_view(), name='all-interviews'),
    path('update/<int:pk>', InterviewUpdateView.as_view(), name='all-interviews'),
)
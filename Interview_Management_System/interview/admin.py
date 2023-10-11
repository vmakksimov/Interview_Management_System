from django.contrib import admin

from Interview_Management_System.interview.models import Interview


# Register your models here.
@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):
    pass
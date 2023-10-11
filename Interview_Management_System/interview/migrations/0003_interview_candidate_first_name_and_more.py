# Generated by Django 4.2.6 on 2023-10-11 15:00

import Interview_Management_System.common.validators
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interview', '0002_remove_interview_date_for_interview'),
    ]

    operations = [
        migrations.AddField(
            model_name='interview',
            name='candidate_first_name',
            field=models.CharField(default=None, max_length=10, validators=[Interview_Management_System.common.validators.only_letters_validator, django.core.validators.MinLengthValidator(2)]),
        ),
        migrations.AddField(
            model_name='interview',
            name='candidate_last_name',
            field=models.CharField(default=None, max_length=10, validators=[Interview_Management_System.common.validators.only_letters_validator, django.core.validators.MinLengthValidator(2)]),
        ),
        migrations.AddField(
            model_name='interview',
            name='date_for_interview',
            field=models.DateField(blank=True, null=True),
        ),
    ]

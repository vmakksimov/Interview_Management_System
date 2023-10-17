About The Project

The project is designed as a platform for a Interview management system, which streamlines and automates the interview process implementing CRUD operations.

The project consists of:

MQ Communication - RabbitMQ broker and celery to ensure that the interview candidate received real-time notification via email upon changing his status, utilizing SES service from AWS and deleting him from the database.
Relational database PostgreSQL to store and manage interview-related data.
REST API: implemented end points for creating, retrieving, reading and updating all the relevant information.
Authentication & Authorization - used technology JWT for authentication and authorization end points. Defined roles and permissions.
Test cases and unit tests were written for critical functionalities.
Setup instructions:

There is a requirments file in the project directory for the needed packages.
The project should be run with python manage.py runserver.
All the relevant end points for graphs and documentation are in the IR_System urls directory as follows:
Architecture diagram at - 'schema-graph/'
OpenAPI documentation at - 'docs/'
Schema at - 'schema'

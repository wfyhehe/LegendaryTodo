from django.shortcuts import render, render_to_response


# Create your views here.
from rest_framework import filters
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.filters import DjangoFilterBackend

from todo.filters import TodoFilter
from todo.migrations.serializers import TodoSerializer
from todo.models import Todo


class TodoViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = {DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter}
    filter_class = TodoFilter
    search_fields = {'title'}
    ordering_field = {'urgency', 'expire_datetime', 'create_datetime'}


def home(request):
    response = render_to_response('index.html')
    return response

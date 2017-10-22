from django.shortcuts import render_to_response
from rest_framework import filters
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.filters import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from todo.filters import TodoFilter
from todo.models import Todo
from todo.serializers import TodoSerializer


class TodoViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    # authentication_classes = (JSONWebTokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = {DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter}
    filter_class = TodoFilter
    search_fields = {'title'}
    ordering_field = {'urgency', 'expire_datetime', 'create_datetime'}

#
# def home(request):
#     response = render_to_response('index.html')
#     return response

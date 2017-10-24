from datetime import datetime
from django.shortcuts import render_to_response
from rest_framework import filters
from rest_framework import mixins
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.filters import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from todo.filters import TodoFilter
from todo.models import Todo
from todo.serializers import TodoSerializer
from utils.permissions import IsOwnerOrReadOnly
import uuid


class TodoViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (JSONWebTokenAuthentication,)

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def create(self, request, *args, **kwargs):
        request.data['id'] = uuid.uuid1().get_hex()
        request.data['create_datetime'] = datetime.now()
        request.data['user'] = request.user
        request.data['completed'] = False
        request.data['deleted'] = False
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user).exclude(deleted=True)

#
# def home(request):
#     response = render_to_response('index.html')
#     return response

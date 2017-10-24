from django.shortcuts import render

# Create your views here.
from rest_framework import authentication
from rest_framework import mixins
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import jwt_payload_handler, jwt_encode_handler

from users.models import MyUser
from users.serializers import UserSignUpSerializer


class UserViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin,
                  mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    # authentication_classes = (JSONWebTokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = MyUser.objects.all()
    serializer_class = UserSignUpSerializer

    # authentication_classes = (JSONWebTokenAuthentication, authentication.SessionAuthentication )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)

        payload = jwt_payload_handler(user)
        ret = serializer.data
        ret['token'] = jwt_encode_handler(payload)
        headers = self.get_success_headers(serializer.data)
        return Response(ret, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()

    def get_object(self):
        return self.request.user

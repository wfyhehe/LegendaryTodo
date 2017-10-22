#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from users.models import MyUser

__author__ = 'wfy'
__date__ = '2017/10/22 14:55'


class UserSignUpSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=False, allow_blank=True, label="email", help_text="email")
    username = serializers.CharField(label="用户名", help_text="用户名", required=True, allow_blank=False,
                                     validators=[UniqueValidator(queryset=MyUser.objects.all(),
                                                                 message="用户已经存在")])
    password = serializers.CharField(
        style={'input_type': 'password'}, required=True, help_text="密码", label="密码", write_only=True,
    )

    def create(self, validated_data):
        username = validated_data['username'] if 'username' in validated_data else ''
        email = validated_data['email'] if 'email' in validated_data else ''
        password = validated_data['password'] if 'password' in validated_data else ''
        user = MyUser.objects.create_user(username, email, password)
        return user

    class Meta:
        model = MyUser
        fields = ('username', 'email', 'password')

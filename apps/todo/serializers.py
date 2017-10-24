#!/usr/bin/env python
# -*- coding: utf-8 -*-
import uuid

from datetime import datetime
from rest_framework import serializers
from rest_framework.serializers import raise_errors_on_nested_writes

from todo.models import Todo

__author__ = 'wfy'
__date__ = '2017/10/21 16:47'


class TodoSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Todo
        fields = '__all__'

#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import serializers

from todo.models import Todo

__author__ = 'wfy'
__date__ = '2017/10/21 16:47'


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

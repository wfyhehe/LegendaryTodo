#!/usr/bin/env python
# -*- coding: utf-8 -*-
import django_filters

from todo.models import Todo

__author__ = 'wfy'
__date__ = '2017/10/21 16:49'


class TodoFilter(django_filters.rest_framework.FilterSet):
    start_time = django_filters.DateTimeFilter(name='create_date', lookup_expr='gte')

    class Meta:
        model = Todo
        fields = ['urgency', 'expire_datetime']

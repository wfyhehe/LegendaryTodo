#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import permissions

__author__ = 'wfy'
__date__ = '2017/10/23 13:27'


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in ('OPTIONS', 'HEAD'):
            return True

        # Instance must have an attribute named `owner`.
        return obj.user == request.user

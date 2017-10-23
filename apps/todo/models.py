# coding=utf-8
from __future__ import unicode_literals
from datetime import datetime

from django.db import models


# Create your models here.
from users.models import MyUser


class Todo(models.Model):
    URGENCY_DEGREE = (
        (1, "不紧急"),
        (2, "一般紧急"),
        (3, "比较紧急"),
        (4, "十万火急"),
    )

    id = models.CharField(max_length=32, primary_key=True, verbose_name='id')
    user = models.ForeignKey(MyUser)
    title = models.TextField(verbose_name='标题')
    completed = models.BooleanField(verbose_name='是否完成')
    urgency = models.IntegerField(choices=URGENCY_DEGREE, verbose_name='紧急程度')
    expire_datetime = models.DateTimeField(verbose_name='过期时间')
    create_datetime = models.DateTimeField(default=datetime.now, verbose_name='创建时间')
    deleted = models.BooleanField(verbose_name='是否删除')

    class Meta:
        verbose_name = "Todo"
        verbose_name_plural = "Todos"

    def __unicode__(self):
        return self.title

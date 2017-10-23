# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.CharField(max_length=32, serialize=False, verbose_name='id', primary_key=True)),
                ('title', models.TextField(verbose_name='\u6807\u9898')),
                ('completed', models.BooleanField(verbose_name='\u662f\u5426\u5b8c\u6210')),
                ('urgency', models.IntegerField(verbose_name='\u7d27\u6025\u7a0b\u5ea6', choices=[(1, '\u4e0d\u7d27\u6025'), (2, '\u4e00\u822c\u7d27\u6025'), (3, '\u6bd4\u8f83\u7d27\u6025'), (4, '\u5341\u4e07\u706b\u6025')])),
                ('expire_datetime', models.DateTimeField(verbose_name='\u8fc7\u671f\u65f6\u95f4')),
                ('create_datetime', models.DateTimeField(default=datetime.datetime.now, verbose_name='\u521b\u5efa\u65f6\u95f4')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Todo',
                'verbose_name_plural': 'Todos',
            },
        ),
    ]

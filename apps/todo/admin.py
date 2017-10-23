from django.contrib import admin

# Register your models here.
from todo.models import Todo


class TodoAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'user', 'create_datetime', 'expire_datetime']


admin.site.register(Todo, TodoAdmin)

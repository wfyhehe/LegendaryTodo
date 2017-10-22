from django.contrib import admin

# Register your models here.
from todo.models import Todo


class TodoAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']


admin.site.register(Todo, TodoAdmin)

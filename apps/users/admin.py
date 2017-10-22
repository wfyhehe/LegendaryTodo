from django.contrib import admin


# Register your models here.
from users.models import MyUser


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


admin.site.register(MyUser, UserAdmin)

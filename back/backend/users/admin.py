from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    def save_model(self, request, obj, form, change):
        if not obj._state.adding and "password" in form.changed_data:
            obj.set_password(obj.password)
        super().save_model(request, obj, form, change)

admin.site.register(User, CustomUserAdmin)
# Register your models here.

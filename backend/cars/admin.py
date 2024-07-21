from django.contrib import admin
from django.apps import apps
from django.contrib.admin.sites import AlreadyRegistered

for model in apps.get_app_config('cars').get_models():
    try:
        @admin.register(model)
        class PostAdmin(admin.ModelAdmin):
            pass
    except AlreadyRegistered as e:
        pass
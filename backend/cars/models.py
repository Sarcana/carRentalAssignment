from django.db import models
from django.conf import settings

class Car(models.Model):
    agency = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    model = models.CharField(max_length=100)
    vehicle_number = models.CharField(max_length=20)
    seating_capacity = models.IntegerField()
    rent_per_day = models.PositiveIntegerField()

class Booking(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    total_cost = models.PositiveIntegerField()
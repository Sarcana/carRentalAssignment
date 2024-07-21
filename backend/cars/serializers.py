from rest_framework import serializers
from .models import Car, Booking

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id','model', 'vehicle_number', 'seating_capacity', 'rent_per_day']

class BookingSerializer(serializers.ModelSerializer):
    car = CarSerializer()
    class Meta:
        model = Booking
        fields = ['id', 'car', 'customer', 'start_date', 'end_date', 'total_cost']

class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'car', 'start_date', 'end_date']
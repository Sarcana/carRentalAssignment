from django.urls import path
from .views import CarListView, CarDetailView, BookingCreateView, BookingListView

urlpatterns = [
    path('cars/', CarListView.as_view(), name='car-list'),
    path('cars/<int:pk>/', CarDetailView.as_view(), name='car-detail'),
    path('bookings/', BookingCreateView.as_view(), name='booking-create'),
    path('bookings/view/', BookingListView.as_view(), name='booking-list'),
]

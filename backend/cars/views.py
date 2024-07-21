from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Car, Booking
from .serializers import CarSerializer, BookingSerializer, BookingCreateSerializer
from .permissions import IsOwnerOrReadOnly

class CarListView(generics.ListCreateAPIView):
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        try:
            if self.request.user.is_agency:
                return Car.objects.filter(car__agency=self.request.user)
        except:
            return Car.objects.all()

    def perform_create(self, serializer):
        self.request.data['agency'] = self.request.user.id
        if self.request.user.is_agency:
            serializer.save(agency=self.request.user)

class CarDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

class BookingCreateView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        car = Car.objects.get(id=self.request.data['car'])
        if self.request.user.is_customer:
            total_cost = (serializer.validated_data['end_date'] - serializer.validated_data['start_date']).days * car.rent_per_day
            serializer.save(customer=self.request.user, total_cost=total_cost)

class BookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_agency:
            return Booking.objects.filter(car__agency=self.request.user).select_related('car')
        if self.request.user.is_customer:
            return Booking.objects.filter(customer=self.request.user.id).select_related('car')
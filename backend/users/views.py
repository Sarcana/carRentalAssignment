from rest_framework import generics, permissions
from .models import User
from .serializers import CustomerRegistrationSerializer, AgencyRegistrationSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

class CustomerRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomerRegistrationSerializer

class AgencyRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AgencyRegistrationSerializer

class UserLoginView(TokenObtainPairView):
    serializer_class = UserSerializer

class UserDetailsView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CustomerRegisterView, AgencyRegisterView, UserDetailsView

urlpatterns = [
    path('register/customer/', CustomerRegisterView.as_view(), name='customer-register'),
    path('register/agency/', AgencyRegisterView.as_view(), name='agency-register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('user_details/', UserDetailsView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]

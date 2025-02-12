from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import login, logout, get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from .serializers import UserSerializer, UserCreateSerializer

User = get_user_model()

class AuthViewMixin:
    permission_classes = (AllowAny,)
    serializer_class = None

class RegisterView(AuthViewMixin, generics.CreateAPIView):
    serializer_class = UserCreateSerializer

class UserDetailView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get(self, request):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = self.serializer_class(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(AuthViewMixin, APIView):
    @csrf_protect
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response(
                {'error': 'Please provide both username and password'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(username=username).first()
        
        if user and user.check_password(password):
            login(request, user)
            serializer = UserSerializer(user)
            return Response(serializer.data)
            
        return Response(
            {'error': 'Invalid credentials'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response({'message': 'Successfully logged out'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(AuthViewMixin, APIView):
    def get(self, request):
        return Response({
            'success': True,
            'message': 'CSRF cookie set'
        })
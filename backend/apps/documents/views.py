from rest_framework import viewsets, permissions, filters
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Document
from .serializers import DocumentSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all().order_by("-created_at")
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields = ['created_at', 'updated_at', 'title']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        document = get_object_or_404(Document, pk=pk, owner=request.user)
        new_document = Document.objects.create(
            title=f"Copy of {document.title}",
            file=document.file,
            owner=request.user
        )
        serializer = self.get_serializer(new_document)
        return Response(serializer.data)

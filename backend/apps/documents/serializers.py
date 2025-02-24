from rest_framework import serializers
from .models import Document
from django.conf import settings

class DocumentSerializer(serializers.ModelSerializer):
    owner_email = serializers.EmailField(source='owner.email', read_only=True)
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ["id", "title", "file", "file_url", "owner", "owner_email", "created_at", "updated_at"]
        read_only_fields = ["id", "owner", "created_at", "updated_at"]

    def get_file_url(self, obj):
        if obj.file:
             return settings.MEDIA_URL + str(obj.file)
        return None

    def validate_title(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError("Title must be at least 3 characters long")
        return value.strip()

    def validate_file(self, value):
        if value.size > 10 * 1024 * 1024:  # 10MB limit
            raise serializers.ValidationError("File size cannot exceed 10MB")
        return value

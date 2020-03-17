from rest_framework import routers, serializers, viewsets
from backend.models import MyUser, Category, SubCategory
from django.shortcuts import get_object_or_404

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ['id', 'name']

class SubCategoryRetrieveSerializer(serializers.ModelSerializer):
  category = CategorySerializer(many=False)

  class Meta:
    model = SubCategory
    fields = ['id', 'name', 'category']

class SubCategoryUpdateSerializer(serializers.ModelSerializer):
  category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False)

  class Meta:
    model = SubCategory
    fields = ['id', 'name', 'category']

class MyUserRetrieveSerializer(serializers.ModelSerializer):
  sub_category = SubCategoryRetrieveSerializer(many=False)

  class Meta:
    model = MyUser
    fields = ['id', 'email', 'first_name', 'last_name', 'country', 'city', 'role', 'sub_category']

class MyUserUpdateSerializer(serializers.ModelSerializer):
  sub_category = serializers.PrimaryKeyRelatedField(queryset=SubCategory.objects.all(), required=False)

  class Meta:
    model = MyUser
    fields = ['id', 'email', 'first_name', 'last_name', 'country', 'city', 'role', 'sub_category']
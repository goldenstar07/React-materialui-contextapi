from rest_framework.permissions import BasePermission, SAFE_METHODS
from backend.models import MyUser

class AdminOnly(BasePermission):
  def has_permission(self, request, view):
    try:
      return request.user.role == 1 # Adminatrator
    except:
      return False

class ReadOnly(BasePermission):
  def has_permission(self, request, view):
    return request.method in SAFE_METHODS

class AllowPost(BasePermission):
  def has_permission(self, request, view):
    return request.method == 'POST'

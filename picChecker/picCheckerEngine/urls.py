from django.urls import path
from .views import index,uploadImage,checkImage

urlpatterns = [
    path("",index),
    path("uploadImage",uploadImage),
    path("checkImage",checkImage),
]
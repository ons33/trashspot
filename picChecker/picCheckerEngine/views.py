from django.shortcuts import render
import pymongo
from django.http import HttpResponse
import cv2
import urllib.request
import numpy as np
from .engine.face_rec import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
# Create your views here.
client = pymongo.MongoClient('mongodb+srv://new:safa@cluster0.uibbjht.mongodb.net/auth?retryWrites=true&w=majority')
mydatabase = client.auth
def index(request):
    print(mydatabase.list_collection_names())
    return HttpResponse("<h1>Hello hello aya winkom ya group</h1>")

# 'https://res.cloudinary.com/dyclohaok/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1678885447/profilePictures/Mahdi_w2hym5.jpg'

@api_view(["POST"])
def uploadImage(request):
    try:
        imageUrl = json.loads(request.body).get('imageUrl')
        userId = json.loads(request.body).get('userId')
        print(imageUrl,userId)
        req = urllib.request.urlopen(imageUrl)
        arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
        img = cv2.imdecode(arr, -1) # 'Load it as it is'
        faceRecognition = FaceRecognition(img)
        if faceRecognition.encode_an_image(img,userId):
            return Response({'message': "Image added successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({'message': "An Error Accured!"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as ex:
        return Response({'message': ex}, status=status.HTTP_400_BAD_REQUEST)

    

@api_view(["POST"])
def checkImage(request):
    try:
        imageUrl = json.loads(request.body).get('imageUrl')
        req = urllib.request.urlopen(imageUrl)
        arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
        img = cv2.imdecode(arr, -1) # 'Load it as it is'
        faceRecognition = FaceRecognition(img)
        result = faceRecognition.classify_face(img)
        if len(result)==2:
            return Response({'message': result[1]}, status=status.HTTP_200_OK)
        else:
            if result==['No face was detected!']:
                return Response({'message': "No face was detected!"}, status=status.HTTP_404_NOT_FOUND)
            return Response({'message': "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as ex:
        return Response({'message': ex}, status=status.HTTP_400_BAD_REQUEST)

        

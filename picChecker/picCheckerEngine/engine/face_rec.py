import face_recognition as fr
import os
import cv2
import face_recognition
import numpy as np
import pickle
import urllib.request


#current_path = os.path.dirname(os.path.realpath(__file__)) + "\\"
current_path = ""#r"C:\\Users\\ghali\\OneDrive\\Bureau\\Mahdi\\"
class FaceRecognition():
    def __init__(self,image):
        self.image = image

    def changejpg(self,f): #remove extentions
        if f.endswith('.jpg') :
            return f.replace('.jpg','')
        elif f.endswith(".JPG"):
            return f.replace(".JPG","")
        else:
            return f.replace('.png','')

    def get_encoded_faces(self):
        try:
            if (os.path.isfile(current_path + "dataset_faces.dat")):
                with open(current_path + 'dataset_faces.dat', 'rb') as f:
                    all_face_encodings = pickle.load(f)
                encoded = all_face_encodings#{}
            else:
                encoded = {}
            return encoded
        except:
            return {}

        

    def unknown_image_encoded(self,img):
        """
        encode a face given the file name
        """
        face = fr.load_image_file(current_path +"test.jpg") #"faces/"
        print(face)
        encoding = fr.face_encodings(face)[0]

        return encoding
    
    def encode_an_image(self,img,ima):
        try:

            if (os.path.isfile(current_path + "dataset_faces.dat")):
                with open(current_path + 'dataset_faces.dat', 'rb') as f:
                    all_face_encodings = pickle.load(f)
                encoded = all_face_encodings#{}
            else:
                encoded = {}
            cv = encoded
            list1 = []
            jpg = ""
            test = False
            f = ima + ".jpg"
            if f.endswith(".jpg") or f.endswith(".png") or f.endswith(".JPG"):
                jpg = self.changejpg(f)
                list1.append(jpg)
                rslt = (jpg in str(encoded))
                if not rslt:
                    test = True
                    # face = fr.load_image_file(img) #faces/
                    encoding = fr.face_encodings(img)[0]
                    encoded[f.split(".")[0]] = encoding
                            
            long = encoded.keys() - list1
            for i in long:
                try:
                    del encoded[i]
                except KeyError:
                    pass
            if test or (len(long)>0) or len(cv) == 0:
                with open(current_path + 'dataset_faces.dat', 'wb') as f:
                    pickle.dump(encoded, f)
                
            return True
        except Exception as ex:
            return False

    def classify_face(self,im):
        global tries
        global tries1
        if not os.path.exists("dataset_faces.dat"):
            return []
        faces = self.get_encoded_faces()
        faces_encoded = list(faces.values())
        known_face_names = list(faces.keys())

        img = self.image #cv2.imread(im,1)
        #img = cv2.resize(img, (0, 0), fx=0.5, fy=0.5)
        #img = img[:,:,::-1]
    
        face_locations = face_recognition.face_locations(img)
        unknown_face_encodings = face_recognition.face_encodings(img, face_locations)

        face_names = ['   ']
        print(" we have ",len(unknown_face_encodings)," faces")
        if (len(unknown_face_encodings)==0):
            return ['No face was detected!']
        for face_encoding in unknown_face_encodings:
            try:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(faces_encoded, face_encoding)#,tolerance=0.55) # na7iha tolerance ken 5yebt i rslt
                name = "Unknown"
                # use the known face with the smallest distance to the new face
                face_distances = face_recognition.face_distance(faces_encoded, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]
            
            except:
                return []
                
            face_names.append(name)
        if len(face_names) ==1:
            pass
        else:
            test_result = False
            for test in face_names[1:]:
                if test != "Unknown":
                    test_result = True
                    break    
            if  test_result :
                print(face_names)
                                
        return face_names



if __name__=="__main__":
    req = urllib.request.urlopen('https://res.cloudinary.com/')
    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
    img = cv2.imdecode(arr, -1) # 'Load it as it is'
    task = FaceRecognition(img)
    # task.encode_an_image(img,"mahdi")
    task.classify_face(img)
    # classify_face(current_path + "test.jpg")

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Gallery() {
  const { id } = useParams();
  const [images, setImages] = useState([]);


  const fileSelectedHandler = (e) => {
    const allFiles = e.target.files;
    const newImages = [];

    for (let i = 0; i < allFiles.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(allFiles[i]);
      reader.onloadend = () => {
        newImages.push({ image: reader.result });
        if (newImages.length === allFiles.length) {
          setImages([...images, ...newImages]);
        }
      };
    }
  };

  const handleAddGallery = async () => {
    console.log(images);
    //console.log(images[0]);
    addGallery();
  };
  const addGallery = async () => {
    //console.log(images[0]);
    const galleryToAdd = {
      product: id,
      images: images,
    };
    console.log(galleryToAdd);
    const response = await axios.post(
      `https://he-bosses-pi-dev-api.onrender.com/gallery/addGallery/${id}`,
      galleryToAdd
    );
    console.log(response);
  };

  return (
    <div>
      <form>
        <div>
          <h2>Upload images</h2>
        </div>
        <h3>Images</h3>
        <input type="file" multiple onChange={fileSelectedHandler} />
        <button
          type="button"
          className="btn btn-success"
          style={{ backgroundColor: "#69b550" }}
          onClick={handleAddGallery}
        >
          +
        </button>
      </form>
    </div>
  );
}

export default Gallery;

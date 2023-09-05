import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  deleteProduct,
  fetchSingleProduct,
} from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";
import "./Popup.css";
function ProductDetails({ product }) {
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    handleDialog("Are you sure you want to delete this product?", true);
    //dispatch(deleteProduct(product._id, navigate));
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      dispatch(deleteProduct(product._id, navigate));
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const handleClick1 = async () => {
    console.log("avant" + product);
    dispatch(fetchSingleProduct(product._id, navigate));
    console.log("après" + product);
  };

  //Gallery
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  // const handleGallery = async () =>{
  //   navigate(`/gallery/${product._id}`);
  // }
  const [images, setImages] = useState([]);
  //const [imagePreviews, setImagePreviews] = useState(false);
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
    //setImagePreviews(true);
  };

  const handleAddGallery = async () => {
    console.log(images);
    addGallery();
    togglePopup();
  };
  const addGallery = async () => {
    //console.log(images[0]);
    const galleryToAdd = {
      product: product._id,
      images: images,
    };
    console.log(galleryToAdd);
    const response = await axios.post(
      `https://he-bosses-pi-dev-api.onrender.com/gallery/addGallery/${product._id}`,
      galleryToAdd
    );
    console.log(response);
  };
  return (
    // <div
    //   className="product-details"
    //   style={{ backgroundColor: "#adc7ea", border: "solid 1px black" }}
    // >
    //   <p>
    //     <strong>{product.category}</strong>
    //   </p>
    //   <p>
    //     <strong>Type:</strong> {product.type}
    //   </p>
    //   <p>
    //     <strong>Brand:</strong> {product.brand}
    //   </p>
    //   <p>
    //     <strong>Price:</strong> {product.price} DT
    //   </p>
    //   <p>
    //     <strong>Quantity:</strong> {product.quantity}
    //   </p>
    //   <p>
    //     <strong>Expiry Date: </strong>
    //     {formatDistanceToNow(new Date(product.expiry_date), {
    //       addSuffix: true,
    //     })}
    //   </p>
    //   <p>
    //     <strong>Description:</strong> {product.description}
    //   </p>
    //   <img
    //     src={product.image.url}
    //     alt={product.description}
    //     style={{ height: "400px", width: "300px", border: "solid 1px black" }}
    //   />
    //   <button onClick={togglePopup}>
    //     Add Pictures to Gallery <i class="fa fa-plus-square"></i>
    //   </button>
    //   {isOpen && (
    //     <div className="popup">
    //       <div className="popup-inner">
    //         <button
    //           onClick={togglePopup}
    //           className="bg-red-800 text-white text-sm font-bold uppercase  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-10"
    //           style={{ marginRight: "-320px", marginTop: "10px" }}
    //         >
    //           <i class="fa fa-x"></i>
    //         </button>
    //         <form>
    //           <div>
    //             <h2>Upload images</h2>
    //           </div>
    //           <br />

    //           {/* <div>
    //             {imagePreviews && (
    //               <div>
    //                 {images.map((img, i) => {
    //                   return (
    //                     <img
    //                       //className="preview"
    //                       src={img}
    //                       alt={"image-" + i}
    //                       key={i}
    //                     />
    //                   );
    //                 })}
    //               </div>
    //             )}
    //           </div> */}

    //           <br />
    //           <br />
    //           <input
    //             type="file"
    //             multiple
    //             onChange={fileSelectedHandler}
    //             className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
    //           />
    //           <br />
    //           <br />

    //           <button
    //             type="button"
    //             className="btn btn-secondary"
    //             //style={{ backgroundColor: "#69b550" }}
    //             onClick={handleAddGallery}
    //           >
    //             Add To Gallery
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    //   <br />
    //   <button
    //     className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
    //     onClick={handleClick}
    //   >
    //     delete
    //   </button>
    //   <button
    //     className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
    //     onClick={handleClick1}
    //   >
    //     update
    //   </button>
    //   {dialog.isLoading && (
    //     <Dialog onDialog={areUSureDelete} message={dialog.message} />
    //   )}
    // </div>
    <div>
      <br />
      <div className="flex">
        <div className="h-25 w-25 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.image?.url}
            alt="t"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <br />
              <h5>
                <a>{product.category}</a>
              </h5>
              <p className="ml-4">{product.price} DT</p>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              <strong>Expires in:</strong> &nbsp;
              {formatDistanceToNow(new Date(product.expiry_date), {
                addSuffix: true,
              })}{" "}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <strong>Type:</strong> &nbsp;{product.type} &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>Brand:</strong>{" "}
              &nbsp;{product.brand}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <strong>Description:</strong> &nbsp; {product.description} &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              <strong>Qty:</strong> &nbsp;{product.quantity}
            </p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            {/* <p className="text-gray-500">
              <strong>Qty:</strong> &nbsp;{product.quantity}
            </p> */}

            <div className="flex flex-1 justify-between">
              <button
                onClick={togglePopup}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Add Pictures to Gallery <i class="fa fa-plus-square"></i>
              </button>

              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={handleClick1}
              >
                Update
              </button>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={handleClick}
              >
                Remove
              </button>
            </div>
            {isOpen && (
              <div className="popup">
                <div className="popup-inner">
                  <button
                    onClick={togglePopup}
                    className="bg-red-800 text-white text-sm font-bold uppercase  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-10"
                    style={{ marginRight: "-320px", marginTop: "10px" }}
                  >
                    <i class="fa fa-x"></i>
                  </button>
                  <form>
                    <div>
                      <h2>Upload images</h2>
                    </div>
                    <br />

                    {/* <div>
                {imagePreviews && (
                  <div>
                    {images.map((img, i) => {
                      return (
                        <img
                          //className="preview"
                          src={img}
                          alt={"image-" + i}
                          key={i}
                        />
                      );
                    })}
                  </div>
                )}
              </div> */}

                    <br />
                    <br />
                    <input
                      type="file"
                      multiple
                      onChange={fileSelectedHandler}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    />
                    <br />
                    <br />

                    <button
                      type="button"
                      className="btn btn-secondary"
                      //style={{ backgroundColor: "#69b550" }}
                      onClick={handleAddGallery}
                    >
                      Add To Gallery
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {dialog.isLoading && (
        <Dialog onDialog={areUSureDelete} message={dialog.message} />
      )}
    </div>
  );
}

export default ProductDetails;

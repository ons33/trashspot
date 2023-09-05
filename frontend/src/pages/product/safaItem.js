import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cardStyle.css";
import "./Popup.css";
import {
  deleteProduct1,
  fetchSingleProduct,
} from "../../redux/actions/productActions";
import { AddFavoris, fetchFavoris } from "../../redux/actions/favorisActions";
import Dialog from "./Dialog";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartbeat } from "@fortawesome/free-solid-svg-icons";


function AllProductDetails({ product, idUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleClick = async () => {
    handleDialog("Are you sure you want to delete this product?", true);
    //dispatch(deleteProduct1(product._id, navigate));
  };

  const handleClick1 = async () => {
    //console.log("avant" + product);
    dispatch(fetchSingleProduct(product._id, navigate));
    //console.log("après" + product);
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      dispatch(deleteProduct1(product._id, navigate));
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    navigate(`/slideShow/${product._id}`);
    //setIsOpen(!isOpen);
  };

  const favorisList = useSelector((state) => state.favoris.favorisList);

  const [images, setImages] = useState([]);

  useEffect(() => {
    showGallery();
    dispatch(fetchFavoris(idUser));
    console.log("hhhhhhhhhhh");
    //console.log(favorisList[0]._id);
  }, []);

  const showGallery = async () => { 
    const response = await axios.get(
      `https://he-bosses-pi-dev-api.onrender.com/gallery/showGallery/${product._id}`
    );
    //console.log(response.data);
    response.data.map((img) => {
      setImages([...images, img.images]);
    });
    //console.log(images.flat());
  };


  const [isFavorite, setIsFavorite] = useState(false);
  const addToFavoris = async () => {
    dispatch(AddFavoris(idUser, product))
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className={`col-lg-3 col-md-4 mb-3 product-box ${
        isHover ? "is-hover" : ""
      } ${product.isValid === true ? "bestProduct" : false}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-box">
        <div className="product-inner-box position-relative">
          <div className="icons">
            <a
              href="#"
              className="text-decoration-none text-dark"
              style={{ backgroundColor: "#69b550" }}
              onClick={addToFavoris}
            >
              <FontAwesomeIcon
                icon={faHeart}
                style={{
                  color: isFavorite || favorisList.some(item => item._id === product._id)
                    ? "#FF1493"
                    : "#000000"
                }}
              />
            </a>
            <a
              href="#"
              className="text-decoration-none text-dark"
              style={{ backgroundColor: "#69b550" }}
              onClick={togglePopup}
            >
              <i class="fa-solid fa-eye"></i>
            </a>
            {/* {isOpen && (
              <div className="popup">
                <div className="popup-inner">
                  <button
                    onClick={togglePopup}
                    className="bg-red-800 text-white text-sm font-bold uppercase  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-10"
                    //style={{ marginRight: "-320px", marginTop: "10px" }}
                  >
                    <i class="fa fa-x"></i>
                  </button>
                  <div className="product-brand">
                    <span>
                      <strong>Brand:</strong> {product.brand}
                    </span>
                  </div>
                  <div className="product-quantity">
                    <span>
                      <strong>Quantity:</strong> {product.quantity}
                    </span>
                  </div>
                  <div className="product-desc">
                    <span>
                      <strong>Description:</strong> {product.description}
                    </span>
                  </div>

                  <div>
                    <div>
                      {images.flat().map((img, i) => {
                        return (
                          <img
                            //className="preview"
                            src={img.url}
                            alt={"image-" + i}
                            key={i}
                            style={{ marginRight: "10px" }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )} */}
            {product.username == idUser ? (
              <a
                href="#"
                onClick={handleClick}
                className="text-decoration-none text-dark"
                style={{ backgroundColor: "#69b550" }}
              >
                <i class="fa-solid fa-trash"></i>
              </a>
            ) : null}
            {product.username == idUser ? (
              <a
                href="#"
                onClick={handleClick1}
                className="text-decoration-none text-dark"
                style={{ backgroundColor: "#69b550" }}
              >
                <i class="fa-solid fa-pen"></i>
              </a>
            ) : null}
          </div>
          {product.isValid === true && (
            <div className="onsale position-absolute top-0 start-0">
              <span className="badge rounded-0">
                <i class="fa-solid fa-arrow-down"></i>PROMO {product.promo}%
              </span>
            </div>
          )}

          <img
            src={product.image.url}
            alt={product.description}
            //className="img-fluid"
            className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
          />
          <div className="cart-btn">
            <button className="btn btn-dark shadow-sm rounded-pill">
              <i class="fa-sharp fa-solid fa-cart-shopping"></i>Add to Cart
            </button>
          </div>
        </div>
        <div className="product-info mt-4 flex justify-between">
          {/* <div className="product-category">
            <h3>{product.category}</h3>
          </div> */}
          {/* <div className="product-type">
            <span>
              <strong>Type:</strong> {product.type}
            </span>
          </div> */}
          {/* <div className="product-brand">
            <span>Brand: {product.brand}</span>
          </div> */}
          <div className="product-price">
            <span>
              {product.price}DT
            </span>
          </div>
          {/* <div className="product-quantity">
            <span>Quantity: {product.quantity}</span>
          </div> */}
          <div className="product-date">
            <span>
              <strong>Expiry Date: </strong>
              {formatDistanceToNow(new Date(product.expiry_date), {
                addSuffix: true,
              })}
            </span>
          </div>
          {/* <div className="product-desc">
            <span>Description: {product.description}</span>
          </div> */}
        </div>
      </div>
      {dialog.isLoading && (
        <Dialog onDialog={areUSureDelete} message={dialog.message} />
      )}
    </div>
  );
}

export default AllProductDetails;

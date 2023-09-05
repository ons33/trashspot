import { addToBasket, getBasket } from '../../redux/actions/basketActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cardStyle.css';
import './Popup.css';
import {
  deleteProduct1,
  fetchSingleProduct,
} from '../../redux/actions/productActions';
import { AddFavoris, fetchFavoris } from '../../redux/actions/favorisActions';
import Dialog from './Dialog';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartbeat } from '@fortawesome/free-solid-svg-icons';

function AllProductDetails({ product, idUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dialog, setDialog] = useState({
    message: '',
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
    handleDialog('Are you sure you want to delete this product?', true);
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
      handleDialog('', false);
    } else {
      handleDialog('', false);
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
    console.log('hhhhhhhhhhh');
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
    dispatch(AddFavoris(idUser, product));
    setIsFavorite(!isFavorite);
  };

  let userId = useSelector((state) => state.auth.user.id);

  async function handleAddToBasket(product) {
    await dispatch(addToBasket(product._id, product.price, 1, userId));
    await dispatch(getBasket(userId));
  }

  return (
    <div
      className="container mx-auto"
      style={{ marginTop: '300px', width: '350px' }}
    >
      <div className="flex flex-wrap ">
        <div className=" px-12 md:px-4 mr-auto ml-auto -mt-32">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
            <div
              className={`product-box ${isHover ? 'is-hover' : ''} ${
                product.isValid === true ? 'bestProduct' : false
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div style={{ height: '300px', width: '300px' }}>
                <div className="product-inner-box position-relative">
                  <div className="icons">
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      style={{ backgroundColor: '#69b550' }}
                      onClick={addToFavoris}
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{
                          color:
                            isFavorite ||
                            favorisList.some((item) => item._id === product._id)
                              ? '#FF1493'
                              : '#000000',
                        }}
                      />
                    </a>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      style={{ backgroundColor: '#69b550' }}
                      onClick={togglePopup}
                    >
                      <i class="fa-solid fa-eye"></i>
                    </a>

                    {product.username == idUser ? (
                      <a
                        href="#"
                        onClick={handleClick}
                        className="text-decoration-none text-dark"
                        style={{ backgroundColor: '#69b550' }}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </a>
                    ) : null}
                    {product.username == idUser ? (
                      <a
                        href="#"
                        onClick={handleClick1}
                        className="text-decoration-none text-dark"
                        style={{ backgroundColor: '#69b550' }}
                      >
                        <i class="fa-solid fa-pen"></i>
                      </a>
                    ) : null}
                  </div>
                  {product.isValid === true && (
                    <div className="onsale position-absolute top-0 start-0">
                      <span className="badge rounded-0">
                        <i class="fa-solid fa-arrow-down"></i>PROMO{' '}
                        {product.promo}%
                      </span>
                    </div>
                  )}
                  <div className="cart-btn">
                    <button
                      className="btn btn-dark shadow-sm rounded-pill"
                      onClick={() => handleAddToBasket(product)}
                    >
                      <i class="fa-sharp fa-solid fa-cart-shopping"></i>Add to
                      Cart
                    </button>
                  </div>
                </div>
                <img
                  alt="tsawer"
                  src={product.image?.url}
                  className="w-full h-full object-cover align-middle rounded-t-lg"
                />
              </div>
              <blockquote className="relative p-8 mb-4">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 583 95"
                  className="absolute left-0 w-full block h-95-px -top-94-px"
                >
                  <polygon
                    points="-30,95 583,95 583,65"
                    className=" fill-current"
                    style={{ color: '#adc7ea' }}
                  ></polygon>
                </svg>
                <p className="text-xl text-black">{product.price} DT</p>
                <p className="text-xm font-light mt-2 text-black">
                  <strong>Expiry date: </strong>
                  {formatDistanceToNow(new Date(product.expiry_date), {
                    addSuffix: true,
                  })}
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      {dialog.isLoading && (
        <Dialog onDialog={areUSureDelete} message={dialog.message} />
      )}
    </div>
  );
}
export default AllProductDetails;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ImageSlider from "./SlideShow";
import { useParams } from "react-router-dom";
import Navbar from "../../components/ReusableComponents/components/Navbars/UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct1 } from "../../redux/actions/productActions";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FacebookShareButton } from "react-share";
import jwt_decode from "jwt-decode";
import "./FBShare.css";
import { AddComment, fetchComments } from "../../redux/actions/commentActions";
function ProductSlideShowAndDetails() {
  console.log(localStorage.getItem("jwt"));
  const token = localStorage.getItem("jwt");
  console.log(jwt_decode(token));
  const idUser = jwt_decode(token).id;

  const [image, setImage] = useState([]);
  const [data, setData] = useState({});
  const getUser = useCallback(async () => {
    const { data } = await axios.get(
      `https://he-bosses-pi-dev-api.onrender.com/api/getUser/${idUser}`
    );
    setData(data);
    setImage(data.image.url);
    console.log(data);
  }, [idUser]);

  const shareUrl = "https://example.com/product"; // Replace this with your product URL
  const title = "Check out this awesome product!"; // Replace this with your product title

  const { id } = useParams();
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    showGallery();
    dispatch(fetchSingleProduct1(id));
    dispatch(fetchComments(id));
    getUser();
  }, [dispatch]);

  const product = useSelector((state) => state.products.product);
  const commentss = useSelector((state)=> state.comments.comments); 

  const showGallery = async () => {
    const response = await axios.get(
      `https://he-bosses-pi-dev-api.onrender.com/gallery/showGallery/${id}`
    );
    //console.log(response.data);
    response.data.map((img) => {
      setImages([...images, img.images]);
    });
    //console.log(images.flat());
  };

  let slides = [];
  images.flat().map((img) => {
    slides.push(img.url);
  });
  const containerStyles = {
    width: "600px",
    height: "600px",
    margin: "0 auto",
    //marginLeft: "100px",
    //marginTop: "100px",
    border: "solid 2px",
  };
  const features = [
    { name: "Type", description: product.type },
    { name: "Brand", description: product.brand },
    { name: "Price", description: product.price + " DT" },
    { name: "Quantity", description: product.quantity },
    { name: "Expiry Date", description: product.expiry_date },
    { name: "Description", description: product.description },
  ];

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  //const [commentsDisplayed, setCommentsDisplayed] = useState([]);

  // const showComments = async () => {
  //   const response = await axios.get(
  //     `https://he-bosses-pi-dev-api.onrender.com/comment/getComments/${product._id}`
  //   );
  //   setCommentsDisplayed(response.data);
  //   console.log(response.data);
  // };

  // const handleAddComment = async () => { 
  //   // Add the comment to the comments section
  //   const updatedComments = [comment, ...comments];
  //   setComments(updatedComments);

  //   try {
  //     // Wait for the state update to complete before sending the request
  //     await axios.post(`https://he-bosses-pi-dev-api.onrender.com/comment/addComment`, {
  //       username: idUser,
  //       product: product._id,
  //       comments: { comment },
  //     });

  //     // Clear the comment input
  //     setComment("");
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error appropriately
  //   }
  // };

  const handleAddComment = ()=> {
    // Add the comment to the comments section
    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    dispatch(AddComment(idUser, product._id, comment));
    // Clear the comment input
     setComment("");
  }
  return (
    <div>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Product Specifications
            </h2>
            <p className="mt-4 text-gray-800">{product.category}</p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="facebook-share-button">
              {/* <img
                alt="..."
                className="w-5 mr-1"
                src={require("../../assets/img/icons8-facebook.svg").default}
              /> */}
              <FacebookShareButton url={shareUrl} quote={title}>
                Share on Facebook
              </FacebookShareButton>
            </div>
          </div>
          <div>
            {/* <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100"
            /> */}
            {slides.length !== 0 ? (
              <div style={containerStyles}>
                <ImageSlider slides={slides} />
              </div>
            ):(<img
              src={product.image?.url}
              alt="Profile"
              className="profile-image"
            />)}
          </div>
          {/* Display comments */}
          <div className="comments-block">
            <div className="comments-list">
              {commentss.length !== 0 ? (
                commentss.map((c, index) => (
                  <div key={index} className="comment">
                    <img
                      src={require("../../assets/img/user-solid.svg").default}
                      alt="Profile"
                      width="20px"
                      className="profile-image"
                    />
                    {/* Render the comment */}
                    <p>{c.comment}</p>
                  </div>
                ))
              ) : (
                <p>No comments to display</p>
              )}
            </div>
            <div className="comments-list">
              {comments
                .map((c, index) => (
                  <div key={index} className="comment">
                    <img
                      src={image} 
                      alt="Profile"
                      width="30px"
                      className="profile-image"
                    />
                    {/* Render the comment */}
                    <p>{c}</p>
                  </div>
                ))
                .reverse()}
            </div>
            {/* Comment input */}
            <div className="comment-input">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {/* Button to add comment */}
              <button onClick={handleAddComment}>
                <img
                  alt="..."
                  className="w-5 mr-1"
                  src={require("../../assets/img/send-fill.svg").default}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSlideShowAndDetails;

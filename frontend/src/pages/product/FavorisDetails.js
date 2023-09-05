import React, { useEffect, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./cardStyle.css";
function FavorisDetails({ product }) {
  return (
    // <div className={`col-lg-3 col-md-4 mb-3 product-box`}>
    //   <div className="product-box">
    //     <div className="product-inner-box position-relative">
    //       <img
    //         src={product.image.url}
    //         alt={product.description}
    //         //className="img-fluid"
    //         className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
    //       />
    //       <div className="cart-btn">
    //         <button className="btn btn-dark shadow-sm rounded-pill">
    //           <i class="fa-sharp fa-solid fa-cart-shopping"></i>Add to Cart
    //         </button>
    //       </div>
    //     </div>
    //     <div className="product-info mt-4 flex justify-between">
    //       {/* <div className="product-category">
    //         <h3>{product.category}</h3>
    //       </div>
    //       <div className="product-type">
    //         <span>
    //           <strong>Type:</strong> {product.type}
    //         </span>
    //       </div> */}
    //       <div className="product-price">
    //         <span>
    //           {product.price}DT
    //         </span>
    //       </div>
    //       <div className="product-date">
    //         <span>
    //           <strong>Expiry Date: </strong>
    //           {formatDistanceToNow(new Date(product.expiry_date), {
    //             addSuffix: true,
    //           })}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className="container mx-auto"
      style={{ marginTop: "300px", width: "350px" }}
    >
      <div className="flex flex-wrap ">
        <div className=" px-12 md:px-4 mr-auto ml-auto -mt-32">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ">
            <div style={{ height: "300px", width: "300px" }}>
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
                  style={{ color: "#adc7ea" }}
                ></polygon>
              </svg>
              <p className="text-xl text-black">{product.price} DT</p>
              <p className="text-xm font-light mt-2 text-black">
                <strong>Expiry date:{" "}</strong>
                {formatDistanceToNow(new Date(product.expiry_date), {
                  addSuffix: true,
                })}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavorisDetails;

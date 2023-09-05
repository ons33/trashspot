import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/ReusableComponents/components/Navbars/UserNavbar";
import FavorisDetails from "./FavorisDetails";
import { fetchAllFavoris } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";

function Favoris() {
  console.log(localStorage.getItem("jwt"));
  const token = localStorage.getItem("jwt");
  console.log(jwt_decode(token));
  const idUser = jwt_decode(token).id;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchAllFavoris(idUser));
  }, [dispatch]);

  //style={{ backgroundColor: "#adc7ea" }}
  return (
    <div>
      <Navbar />
      <br />

      {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div
        style={{
          flex: "1 1 auto",
          minWidth: "320px",
          maxWidth: "70%",
          padding: "0 20px",
        }}
      >
        <div>
          <div className="container">
            <br></br>
            <br />
            <div className="row">
              {products &&
                products.map((product) => (
                  <FavorisDetails
                    product={product}
                    key={product._id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div> */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ul style={{ display: "flex", justifyContent: "space-between" }}>
          {products && products.map((product) => (
            <FavorisDetails
              md={2}
              product={product}
              key={product._id}
              style={{ display: "flex", justifyContent: "space-between" }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Favoris;

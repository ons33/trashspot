import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/actions/productActions";
import ProductDetails from "./ProductDetails";
import jwt_decode from "jwt-decode";
import "./myProducts.css";
import Navbar from "../../components/ReusableComponents/components/Navbars/UserNavbar";
import ProfileAddProduct from "./ProfileAddProduct";
import { useNavigate } from "react-router-dom";

function ProductsCreated(props) {
  console.log(localStorage.getItem("jwt"));
  const token = localStorage.getItem("jwt");
  console.log(jwt_decode(token));
  const idUser = jwt_decode(token).id;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts(idUser));
  }, [dispatch]);
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate("/addProduct");
  };
  return (
    <>
      <Navbar />
      <div className="pages">
        <div className="home">

          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {products && products.map((product) => (
                      <ProductDetails product={product} key={product._id} className="flex py-6"
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="mt-6">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  style={{ backgroundColor: "#adc7ea", border: "solid 1px black" }}
                  onClick={handleClick}
                >
                  ADD PRODUCT
                </a>
              </div>
            </div>
          </div>
          {/* <div className="products">
            <h1>My Products</h1>
            {products &&
              products.map((product) => (
                <ProductDetails product={product} key={product._id} />
              ))}
          </div> */}
          <div style={{ marginTop: "100px" }}>
            <ProfileAddProduct />
            {/* <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-0 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              onClick={handleClick}
            >
              ADD PRODUCT
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsCreated;

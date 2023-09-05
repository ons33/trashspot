import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { Box, Button } from '@material-ui/core';
import {
  fetchAllProducts,
  fetchAllProducts1,
  fetchAllProducts2,
  fetchAllProducts3,
  fetchAllProducts4,
  fetchAllProducts5,
  fetchAllProducts6,
} from "../../redux/actions/productActions";
import AllProductDetails from "./AllProductDetails";
import Navbar from "../../components/ReusableComponents/components/Navbars/UserNavbar";
import "./AllProducts.css";

function AllProducts() {
  
  console.log(localStorage.getItem("jwt"));
  const token = localStorage.getItem("jwt");
  console.log(jwt_decode(token));
  const idUser = jwt_decode(token).id;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  useEffect(() => {
    if (selectedCategories.length > 0) {
      dispatch(fetchAllProducts3(selectedCategories));
    } else {
      dispatch(fetchAllProducts());
    }
  }, [selectedCategories]);
  const handleMinPriceChange = (event) => {
    setMinPrice(parseInt(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseInt(event.target.value));
  };

  const handleFilter = () => {
    dispatch(fetchAllProducts1({ minPrice, maxPrice }));
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    dispatch(fetchAllProducts2(searchQuery));
  };

  function handleCategoryChange(event) {
    const value = event.target.value;
    if (event.target.checked) {
      console.log("yahhh" + value);
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    }
  }

  const handleSelectChange = (e) => {
    const { value } = e.target;
    if(value == "price"){
      dispatch(fetchAllProducts4());
    }else if (value == "Expiry Date"){
      dispatch(fetchAllProducts5());
    }else if (value == "Promo"){
      dispatch(fetchAllProducts6());
    }
    else{
      dispatch(fetchAllProducts());
    }
  };

  //paginate
  const items = 8
  const [current, setCurrent] = useState(1);
  const NbPage = Math.ceil(products.length / items);
  const startIndex = (current - 1) * items
  const endIndex = startIndex + items
  const DataPerPage = products.slice(startIndex, endIndex);

//style={{ backgroundColor: "#adc7ea" }}
  return (
    <div style={{ backgroundColor: "#adc7ea" }}>
      <Navbar />
      <br />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          style={{
            flex: "0 1 auto",
            minWidth: "320px",
            maxWidth: "30%",
            marginTop: "8px",
            padding: "0 20px",
          }}
        >
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card1 p-4">
              <div className=" image d-flex flex-column justify-content-center align-items-center">
                {/* search */}
                <div className="icon">
                  <i class="fa fa-search"></i>
                  <input
                    type="text"
                    id="typeProduct"
                    placeholder="search By product name..."
                    className="border-0 py-2.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onInput={handleSearch}
                  />
                </div>
                <br />

                {/* filter price */}
                <div class=" d-flex mt-2">
                  <div>
                    <label for="min">Minimum price:&nbsp;&nbsp;</label>
                    <input
                      type="number"
                      id="min"
                      name="min"
                      min="0"
                      max="100"
                      step="1"
                      style={{ width: "50%", maxWidth: "200px" }}
                      className="border-0 px-3 py-2.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={handleMinPriceChange}
                      value={minPrice}
                    />
                    <br />
                    <br />
                    <label for="max">Maximum price:&nbsp;&nbsp;</label>
                    <input
                      type="number"
                      id="max"
                      name="max"
                      min="0"
                      max="100"
                      step="1"
                      style={{ width: "50%", maxWidth: "200px" }}
                      className="border-0 px-3 py-2.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={handleMaxPriceChange}
                      value={maxPrice}
                    />
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      class="btn btn-success"
                      style={{ backgroundColor: "#69b550" }}
                      onClick={handleFilter}
                    >
                      FILTER
                    </button>
                  </div>
                </div>

                <br />
                {/* filter category */}
                <div>
                  <label>
                    <strong>Filter by Category</strong>
                  </label>
                  <label className="custom-control overflow-checkbox">
                    <input
                      type="checkbox"
                      className="overflow-control-input"
                      value={"PRODUITS LAITIERS"}
                      onChange={handleCategoryChange}
                    />
                    &nbsp;&nbsp;
                    <span className="overflow-control-description">
                      PRODUITS LAITIERS
                    </span>
                  </label>
                  <label className="custom-control overflow-checkbox">
                    <input
                      type="checkbox"
                      className="overflow-control-input"
                      value={"FRUITS ET LÉGUMES"}
                      onChange={handleCategoryChange}
                    />
                    &nbsp;&nbsp;
                    <span className="overflow-control-description">
                      FRUITS ET LÉGUMES
                    </span>
                  </label>
                  <label className="custom-control overflow-checkbox">
                    <input
                      type="checkbox"
                      className="overflow-control-input"
                      value={"PRODUITS CÉRÉALIERS"}
                      onChange={handleCategoryChange}
                    />
                    &nbsp;&nbsp;
                    <span className="overflow-control-description">
                      PRODUITS CÉRÉALIERS
                    </span>
                  </label>
                  <br />
                  <label className="custom-control overflow-checkbox">
                    <input
                      type="checkbox"
                      className="overflow-control-input"
                      value={"EAU"}
                      onChange={handleCategoryChange}
                    />
                    &nbsp;&nbsp;
                    <span className="overflow-control-description">EAU</span>
                  </label>
                  <br />
                  <label className="custom-control overflow-checkbox">
                    <input
                      type="checkbox"
                      className="overflow-control-input"
                      value={"PATES"}
                      onChange={handleCategoryChange}
                    />
                    &nbsp;&nbsp;
                    <span className="overflow-control-description">PATES</span>
                  </label>
                  <label className="custom-control overflow-checkbox">
                    <input
                      type="checkbox"
                      className="overflow-control-input"
                      value={"VIANDE, POISSON ET FRUITS DE MER"}
                      onChange={handleCategoryChange}
                    />
                    &nbsp;&nbsp;
                    <span className="overflow-control-description">
                      VIANDE, POISSON ET FRUITS DE MER
                    </span>
                  </label>
                </div>
                <br />
                {/* sort by */}
                <div>
                  <label>
                    <strong>Sort by</strong>
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option selected value="all">Open this select menu</option>
                    <option value="price">price</option>
                    <option value="Expiry Date">Expiry Date</option>
                    <option value="Promo">Promo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  DataPerPage.map((product) => (
                    <AllProductDetails
                      product={product}
                      key={product._id}
                      idUser={idUser}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Box sx = {{display: "flex", justifyContent: "center", mt:1, border : "solid 0.5px", width: "500px", marginLeft: "650px"}}>
        {
          Array.from({length: NbPage}, (_,i)=> i+1).map( page => {
            return <Button onClick={()=> setCurrent(page)} style={{backgroundColor: "#efefef", marginLeft: "5px"}}>{page}</Button> 
          })
        }
      </Box>
    </div>
  );
}

export default AllProducts;

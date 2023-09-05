import React, { useState, useCallback, useEffect } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Classnames from "classnames";
import { UpdateImage, updateProduct } from "../../redux/actions/productActions";
import axios from "axios";
import "./formProduct.css";

function FormUpdateProduct() {
  const [data, setData] = useState({});
  const [image, setImage] = useState([
    "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg",
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const errors = useSelector((state) => state.errors);

  var curr = new Date();
  const [date, setDate] = useState(curr.toISOString().substring(0, 10));
  const [mochkla, setMochkla] = useState({});

  const getProduct = useCallback(async () => {
    const { data } = await axios.get(
      `https://he-bosses-pi-dev-api.onrender.com/product/getSingleProduct/${id}`
    );
    setData(data);
    setImage(data.image.url);

    curr = new Date(data.expiry_date);
    curr.setDate(curr.getDate());
    setDate(curr.toISOString().substring(0, 10));
  }, [id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  // Available categories list
  const categories = [
    "PRODUITS LAITIERS",
    "FRUITS ET LÉGUMES",
    "PRODUITS CÉRÉALIERS",
    "EAU",
    "PATES",
    "VIANDE, POISSON ET FRUITS DE MER",
    "OTHER",
  ];

  const [categoryIsOther, setCategoryIsOther] = useState(false);

  const handleSelectChange = (e) => {
    setCategoryIsOther(e.target.value === "OTHER");
    setData((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    //console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const onChangeHandler = (e) =>
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault(); //pour ne rien afficher dans l'url
    //validate price
    const newErrors = {};
    if (data.price < 0) {
      newErrors.price = "The price entered is incorrect";
    }
    if (data.price > 100000) {
      newErrors.price = "The price entered is incorrect";
    }
    if (!data.price) {
      newErrors.price = "The price is required";
    }
    //validate quantity
    if (data.quantity < 0) {
      newErrors.quantity = "The quantity entered is incorrect";
    }
    if (data.quantity > 1000) {
      newErrors.quantity = "The quantity entered is incorrect";
    }
    if (!data.quantity) {
      newErrors.quantity = "The quantity is required";
    }
    //validate expiry date
    // const curr = new Date().getTime();
    // const expiryDate = new Date(data.expiry_date).getTime();
    // if (expiryDate < curr) {
    //   newErrors.expiry_date = "The product has reached its expiry date!";
    // }
    //validate type
    if (!data.type) {
      newErrors.type = "The type is required";
    }
    //validate brand
    if (!data.brand) {
      newErrors.brand = "The brand is required";
    }
    setMochkla(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(mochkla);
      dispatch(updateProduct(id, data, navigate), UpdateImage(id, image));
    }
    //dispatch(updateProduct(id, data, navigate), UpdateImage(id, image));
  };

  return (
    <div class="page-wrapper bg-red p-t-180 p-b-100 font-robo">
      <div class="wrapper wrapper--w960">
        <div class="card card-2">
          <div class="card-heading"></div>
          <div class="card-body">
            <h2 class="title" style={{ color: "#2c6ed5" }}>
              UPDATE PRODUCT
            </h2>
            <br />
            <form className="create" method="POST" onSubmit={handleSubmit}>
              <label>category:</label>
              <br />
              {!categories.includes(data.category) ? (
                <div>
                  <select
                    name="category"
                    className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                    value={data.category}
                    onChange={handleSelectChange}
                  >
                    <option>Choose a category</option>
                    <option>PRODUITS LAITIERS</option>
                    <option>FRUITS ET LÉGUMES</option>
                    <option>PRODUITS CÉRÉALIERS</option>
                    <option>EAU</option>
                    <option>PATES</option>
                    <option>VIANDE, POISSON ET FRUITS DE MER</option>
                    <option>OTHER</option>
                  </select>
                  <br />
                  <br />
                  <Inputs
                    name="category"
                    type="text"
                    placeholder="category"
                    onChangeHandler={onChangeHandler}
                    errors={errors.category}
                    value={data.category || ""}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              ) : (
                <div>
                  <select
                    name="category"
                    className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                    value={data.category}
                    onChange={handleSelectChange}
                  >
                    <option>Choose a category</option>
                    <option>PRODUITS LAITIERS</option>
                    <option>FRUITS ET LÉGUMES</option>
                    <option>PRODUITS CÉRÉALIERS</option>
                    <option>EAU</option>
                    <option>PATES</option>
                    <option>VIANDE, POISSON ET FRUITS DE MER</option>
                    <option>OTHER</option>
                  </select>
                  <br />
                  <br />
                  {categoryIsOther && (
                    <Inputs
                      name="category"
                      type="text"
                      placeholder="category"
                      onChangeHandler={onChangeHandler}
                      errors={errors.category}
                      value={data.category || ""}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  )}
                </div>
              )}

              <br />
              <label>Type:</label>
              <Inputs
                name="type"
                type="text"
                placeholder="type"
                onChangeHandler={onChangeHandler}
                errors={errors.type}
                value={data.type || ""}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {mochkla.type && (
                <span style={{ color: "red" }}>{mochkla.type}</span>
              )}
              <br />
              <label>Brand:</label>
              <Inputs
                name="brand"
                type="text"
                placeholder="brand"
                onChangeHandler={onChangeHandler}
                errors={errors.brand}
                value={data.brand || ""}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {mochkla.brand && (
                <span style={{ color: "red" }}>{mochkla.brand}</span>
              )}
              <br />
              <label>Price:</label>
              <Inputs
                name="price"
                type="number"
                placeholder="price"
                onChangeHandler={onChangeHandler}
                errors={errors.price}
                value={data.price || ""}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {mochkla.price && (
                <span style={{ color: "red" }}>{mochkla.price}</span>
              )}
              <br />
              <label>Quantity:</label>
              <Inputs
                name="quantity"
                type="number"
                placeholder="quantity"
                onChangeHandler={onChangeHandler}
                errors={errors.quantity}
                value={data.quantity || ""}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {mochkla.quantity && (
                <span style={{ color: "red" }}>{mochkla.quantity}</span>
              )}
              <br />
              <label>Expiry date:</label>
              <Inputs
                name="expiry_date"
                type="date"
                placeholder="expiry_date"
                //onChangeHandler={onChangeHandler}
                onChangeHandler={(e) => {
                  console.log(e.target.value);
                  setDate(e.target.value);
                  setData((prev) => ({
                    ...prev,
                    expiry_date: e.target.value,
                  }));
                }}
                errors={errors.expiry_date}
                value={date}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {/* {mochkla.expiry_date && (
                <span style={{ color: "red" }}>{mochkla.expiry_date}</span>
              )} */}
              <br />
              <label>Description:</label>
              <textarea
                name="description"
                type="text"
                placeholder="Description..."
                value={data.description || ""}
                class={Classnames("form-control")}
                onChange={onChangeHandler}
              />
              <br />
              <div className="mb-4 d-flex">
                <img
                  src={image}
                  alt="example placeholder"
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="d-flex">
                <div className="btn btn-primary btn-rounded">
                  <label
                    className="form-label text-white m-1"
                    htmlFor="customFile1"
                  >
                    Choose file
                  </label>
                  <input
                    type="file"
                    className="form-control d-none"
                    id="customFile1"
                    accept="image/*"
                    onChange={handleImage}
                  />
                </div>
              </div>
              <br />
              <button
                type="submit"
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormUpdateProduct;

import React, { useState } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, UploadImage } from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
import Classnames from "classnames";
import jwt_decode from "jwt-decode";
import "./formProduct.css";
import ProgressBarInput from "./ProgressBarInput";

function FormProduct() {
  console.log(localStorage.getItem("jwt"));
  const token = localStorage.getItem("jwt");
  console.log(jwt_decode(token));
  const idUser = jwt_decode(token).id;

  const [mochkla, setMochkla] = useState({});

  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState([
    "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg",
  ]);
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

  const errors = useSelector((state) => state.errors);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  
  const [categoryIsOther, setCategoryIsOther] = useState(false);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setCategoryIsOther(value === "OTHER");
    setForm({
      ...form,
      category: value,
    });
  };

 
    //promo
    const [value1, setValue1] = useState(50);

    const handleChange = (newValue) => {
      setValue1(newValue);
      setForm({
        ...form,
        promo: newValue,
      });
    }


  const handleSubmit = (e) => {
    e.preventDefault(); //pour ne rien afficher dans l'url
    //validate price
    const newErrors = {};
    if (form.price < 0) {
      newErrors.price = "The price entered is incorrect";
    }
    if(form.price>100000){
      newErrors.price = "The price entered is incorrect";
    }
    if(!form.price){
      newErrors.price = "The price is required";
    }
    //validate quantity
    if (form.quantity < 0) {
      newErrors.quantity = "The quantity entered is incorrect";
    }
    if(form.quantity > 1000){
      newErrors.quantity = "The quantity entered is incorrect";
    }
    if(!form.quantity){
      newErrors.quantity = "The quantity is required";
    }
    //validate expiry date
    const curr = new Date().getTime();
    const expiryDate = new Date(form.expiry_date).getTime();
    if (expiryDate < curr) {
      newErrors.expiry_date = "The product has reached its expiry date!";
    }
    if(!form.expiry_date){
      newErrors.expiry_date = "The expiry date is required";
    }
    //validate type
    if(!form.type){
      newErrors.type = "The type is required";
    }
    //validate brand
    if(!form.brand){
      newErrors.brand = "The brand is required";
    }
    setMochkla(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(mochkla);
      dispatch(AddProduct(form, idUser, navigate), UploadImage(image));
    }
  };


  return (
    <div class="page-wrapper bg-red p-t-180 p-b-100 font-robo">
      <div class="wrapper wrapper--w960">
        <div class="card card-2">
          <div class="card-heading"></div>
          <div class="card-body">
            <h2 class="title" style={{ color: "#2c6ed5" }}>
              ADD NEW PRODUCT
            </h2>
            <br />
            <form className="create" method="POST" onSubmit={handleSubmit}>
              <label>Category:</label>
              <br />
              <select
                name="category"
                className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                value={form.category}
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
                //errors={errors.category}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />)}
              <br />
              <label>Type:*</label>
              <Inputs
                name="type"
                type="text"
                placeholder="type"
                onChangeHandler={onChangeHandler}
                //errors={errors.type}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {mochkla.type && (
                <span style={{ color: "red" }}>{mochkla.type}</span>
              )}
              <br />
              <label>Brand:*</label>
              <Inputs
                name="brand"
                type="text"
                placeholder="brand"
                onChangeHandler={onChangeHandler}
                //errors={errors.brand}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {mochkla.brand && (
                <span style={{ color: "red" }}>{mochkla.brand}</span>
              )}
              <br />
              <label>Price (DT) per piece :*</label>
              <Inputs
                name="price"
                //type="number"
                placeholder="price"
                onChangeHandler={onChangeHandler}
                //errors={errors.price}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {mochkla.price && (
                <span style={{ color: "red" }}>{mochkla.price}</span>
              )}
              <br />
              <label>Quantity (per piece): *</label>
              <Inputs
                name="quantity"
                type="number"
                placeholder="quantity"
                onChangeHandler={onChangeHandler}
                //errors={errors.quantity}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {mochkla.quantity && (
                <span style={{ color: "red" }}>{mochkla.quantity}</span>
              )}
              <br />
              <label>Expiry date: *</label>
              <Inputs
                name="expiry_date"
                type="date"
                placeholder="expiry_date"
                onChangeHandler={onChangeHandler}
                //errors={errors.expiry_date}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              {mochkla.expiry_date && (
                <span style={{ color: "red" }}>{mochkla.expiry_date}</span>
              )}
              <br />
              <label>Description:</label>
              <textarea
                name="description"
                type="text"
                placeholder="Description..."
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
              <div>
                <p>How much of a percentage discount would you like to apply to the promotion before it expires in 5 days?</p>
                <p>{value1}%</p>
                <ProgressBarInput
                  min={0}
                  max={100}
                  step={10}
                  value={value1}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button
                type="submit"
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormProduct;
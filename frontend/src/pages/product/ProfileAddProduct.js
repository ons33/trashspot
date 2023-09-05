import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./ProfileStyle.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
function ProfileAddProduct() {
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

  useEffect(() => {
    getUser();
  }, [getUser]);
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate(`/formPart/${idUser}`)
  };

  return (
    <div
      className="container mt-4 mb-4 p-3 d-flex justify-content-center"
    >
      <div className="card1 p-4">
        <div className=" image d-flex flex-column justify-content-center align-items-center">
          <button>
            <img
              //   src={"https://i.imgur.com/wvxPV9S.png"}
              src={image}
              //height="100"
              style={{ borderRadius: "50%", width: "140px", height: "140px" }}
              //width="100"
            />
          </button>
          <br />
          <span class="name mt-3">
            {data.firstName} {data.lastName}
          </span>
          <span class="idd">{data.email}</span>
          <br />
          {/* <div class="d-flex flex-row justify-content-center align-items-center gap-2">
            <span class="idd1">Oxc4c16a645_b21a</span>
            <span>
              <i class="fa fa-copy"></i>
            </span>
          </div>
          <div class="d-flex flex-row justify-content-center align-items-center mt-3">
            <span class="number">
              1069 <span class="follow">Followers</span>
            </span>
          </div> */}
          <div class=" d-flex mt-2">
            <button className="btn1 btn-dark" onClick={handleClick}>
              Edit Profile
            </button>
          </div>
          <br />
          <div class="text mt-3">
            <span>
              {data.bio}
              <br />
              <br />
            </span>
          </div>
          <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span>
              <i class="fa fa-twitter"></i>
            </span>
            <span>
              <i class="fa fa-facebook-f"></i>
            </span>
            <span>
              <i class="fa fa-instagram"></i>
            </span>
            <span>
              <i class="fa fa-linkedin"></i>
            </span>
          </div>
          {/* <div class=" px-2 rounded mt-4 date ">
            <span class="join">Joined May,2021</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProfileAddProduct;

import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import {setUser} from "../redux/actions/authActions"
import jwt_decode from 'jwt-decode';
import { setAuth } from '../util/setAuth';
import { useDispatch } from 'react-redux';
import "./Profile.css"
import {  useNavigate } from 'react-router-dom';
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const Profile = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleClose, show } = props;
  const type = Object.keys(props).includes("show")
  const showHideClassName = "modal" //show ? "modal display-block" : "modal display-none";
  var showHideStyle = show ? {display: "block"} : {display: "none"};
  if (!type){
     showHideStyle = {display: "block"};
  }
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    console.log(pictureSrc);

    UpdateImage(pictureSrc);
  });
  const UpdateImage = async (image) => {
    if (!type){
      const response = await axios.put(`https://he-bosses-pi-dev-api.onrender.com/api/loginImage`, {
        image: image,
      });
    }
    else{
     await axios.put(`https://he-bosses-pi-dev-api.onrender.com/api/checkImage`, {
        image: image,
      }).then((response)=>{
        const { token } = response.data;
        localStorage.setItem('jwt', token);
        const decode = jwt_decode(token);
        dispatch(setUser(decode));
        setAuth(token);
        console.log("navigate")
      })
    }
  
  };
  return (
    show ?
    <div className={showHideClassName}  style={showHideStyle}>
      <section className="modal-main">
        <h2 className="mb-5 text-center" style={{"background":"white"}}>
          React Photo Capture using Webcam Examle
        </h2>
        <div className="camModal">
        <div style={{textAlign:"center"}} className="innerCamModal">
          {picture == "" ? (
            <Webcam
              audio={false}
              height={400}
              ref={webcamRef}
              width={400}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={picture} />
          )}
        <div>
          {picture != "" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setPicture();
              }}
              className="btn btn-primary"
            >
              Retake
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="btn btn-danger"
            >
              Capture
            </button>
          )}
        </div>
        <button type="button" onClick={handleClose}>Close</button>
        
        </div>  
        </div>
      </section>
    </div>
  :<></>);
};
export default Profile;

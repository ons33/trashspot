import React, { useState } from "react";
import axios from "axios";
function CollectModal(props) {
  const [error, setError] = useState("");
  const [picture, setPicture] = useState("");
  const [sign, setSign] = useState(false);
  const closeCollectModal = () => {
    props.closeCollectModal();
  };

  const uploadTrashPicture = (event) => {
    if (event.target.files.length > 0) {
      if (event.target.files[0].size < 11104900) {
        if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/i))
          setError("You must upload an image");
        else setFileToBase(event.target.files[0]);
      } else {
        setError("Image size must be < 10Mb");
      }
    }
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicture(reader.result);
      //setData(data);
    };
  };

  const emptyModalVariables = ()=>{
    setPicture("")
    setSign(false)
    setError("")
  }

  const collectTrash = ()=>{
    if(picture.length>0){
        if (sign){
            setError("Please wait...")
            axios
            .post("https://he-bosses-pi-dev-api.onrender.com/api/collectTrash", {
              id:props.trash._id,
              image: picture,
              honorSign:sign,
              collectedBy:props.myid, 
            })
            .then((res) => {
              if (res.data) {
                
                closeCollectModal()
                emptyModalVariables();
                props.collectTrashUpdate(res.data)
                //show notification
              } else {
                setError(res.data);
              }
            });
        }else{
            setError("Accept the honors assignment!")
        }
    }else{
        setError("You need to add a picture!")
    }
  }

  const openDialog = () => {
    document.getElementById("fileid").click();
  };
  return (
    <>
      <div className="addModalBackground"></div>

      <div className="modalCollect">
        <div className="modalHeader">
          <div className="d-flex justify-content-between">
            <b>Collect a trash</b>
            <button onClick={closeCollectModal} className="closeModal">
              X
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="collectModalContent">
            <div className="beforePart">
              <h4>Before:</h4>
              <img
                src={props.trash.image.url}
                style={{ height: 211 }}
                height={400}
                width={400}
              ></img>
            </div>
            <div className="afterPart">
              <h4>After:</h4>
              {picture.length<10 ? <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD6nCWihzO02WGmWigw5eP7fl7NGFuFbxSIElYFA7w7z-Q5FYNM69_epX1S-NqP_LDFnE&usqp=CAU"} 
                style={{ height: 211 }}
                height={400}
                width={400} />
             : <img
                src={picture}
                style={{ height: 211 }}
                height={400}
                width={400}
              ></img>}
              <input
                id="fileid"
                type="file"
                onChange={uploadTrashPicture}
                hidden
              />
              <div className="d-flex">
                <input
                  id="buttonid"
                  type="button"
                  className="mt-2 btn btn-primary"
                  onClick={openDialog}
                  value="Upload Image"
                />
              </div>
            </div>
            <div className="swearPart mt-4" >
                
            <h5>Honors assignment</h5>
                  <label>I collected this trash: &nbsp;</label>
                  <input onChange={()=> setSign(!sign)} checked={sign} type="checkbox" />
            </div>
            
            <div className="d-flex justify-content-center " style={{marginTop:"40px"}}>
              {error == "Please wait..." ?
              <div className="errors mt-3">{error} <div  className="spinner-border" style={{    marginBottom: "-10px"}} role="status">
                          <span className="visually-hidden">Loading...</span>
                          </div></div>:
              <div className="errors mt-3">{error}</div>}
            </div>
          </div>
      <div className="footer d-flex justify-content-end">
        <button className="btn btn-success" onClick={collectTrash} disabled={error == "Please wait..."} >
         Collect
        </button>
      </div>
        </div>
      </div>
    </>
  );
}

export default CollectModal;

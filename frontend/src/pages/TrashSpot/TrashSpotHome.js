import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/ReusableComponents/components/Navbars/UserNavbar";
import MapTrashSpot from "../../components/MapTrashSpot";
import "./TrashSpot.css";
import NoAccess from "../NoAccess";
import axios from "axios";
import SpotCard from "./SpotCard";
import jwt_decode from "jwt-decode";
import AddUpdateModal from "./AddUpdateModal";
import RankingTrashPage from "./RankingTrashPage";
function TrashSpotHome(props) {
  
  const options = [
    { value: "", text: "--Choose a type--" },
    { value: "plastic", text: "Plastic" },
    { value: "steel", text: "Steel" },
    { value: "paper", text: "Paper" },
    { value: "other", text: "Other..." },
  ];

  const token = localStorage.getItem("jwt");
  const id = jwt_decode(token).id;
  //const webcamRef = React.useRef(null);
  const [currentLat, setCurrLat] = useState(0);
  const [currentLong, setCurrLong] = useState(0);
  const [type, setType] = useState(options[0].value);
  const [picture, setPicture] = useState("");
  const [error, setError] = useState("");
  const [accessTrash, setAccessTrash] = useState(false);
  const [trashSize, setTrashSize] = useState("small");
  const [imageName, setImageName] = useState("");
  const [positionLat, setPositionLat] = useState(0);
  const [positionLng, setPositionLng] = useState(0);
  const [description, setDescription] = useState("");
  const [trashSpots, setTrashSpots] = useState([]);
  const [allTrashSpots, setAllTrashSpots] = useState([]);
  const [trashMarks, setTrashMarks] = useState([]);
  const [idTrash, setIdTrash] = useState(-1);
  const [mapMarkerRemoverTrigger, setMapMarkerRemover] = useState("")
  const [addMapMarker, setAddMapMarker] = useState({})
  const [updateTrigger, setUpdateTrigger] = useState(0); // integer state
  const [rankingModel, setRankingModel] = useState(0);
  const [jumpToOnMap , setJumpToMap] = useState([0,0])
  const [newImage , setNewImage] = useState(0) // just to prevent uploading same picture in cloudinary when updating a post
  const [untouchableDataBackend, setUntouchableDataBackend] = useState([])
  const [newTrash, setNewTrash] = useState("") 
  const [rankingPersons, setRankingPersons] = useState([]) 
  const [triggerWhichPage,setTriggerWhichPage] = useState(0)
  const [deleteRoundedAndCreateAnother, setDeleteRoundedAndCreateAnother] = useState([])
  const [openModalToggle, setOpenModalToggle] = useState(false);
  
  useEffect(() => {
  if (rankingPersons.length==0){
      
      axios.get("https://he-bosses-pi-dev-api.onrender.com/api/getTrashRanks").then((res) => {
          if (res.data){
              setRankingPersons(res.data)
          }
      });
  }
    }, []);

  useEffect(() => {
    
    axios.get("https://he-bosses-pi-dev-api.onrender.com/api/getAllTrashSpots").then((res) => {
      setAllTrashSpots(res.data);
      setUntouchableDataBackend(JSON.parse(JSON.stringify(res.data)));
      // setTrashMarks(
      //   res.data.filter((tr)=>{
      //    if (tr.importanceLevel =="primary"){
      //     return tr
      //    }
      //   }).map((trash) => (
      //     {
      //     id: trash._id,
      //     longitude: trash.location.coordinates[1],
      //     latitude: trash.location.coordinates[0],
      //     ownerId: trash.ownerId._id,
      //     type: trash.type,
      //   }))
      // );
      setTrashSpots(
        res.data.filter((trash) => {
          if (trash.ownerId._id != id) return trash;
        })
      );
    });
  }, []);

  useEffect(()=>{
    setTrashMarks(
      untouchableDataBackend.filter((tr)=>{
       if (tr.importanceLevel =="primary"){
        return tr
       }
      }).map((trash) => (
        {
        id: trash._id,
        longitude: trash.location.coordinates[1],
        latitude: trash.location.coordinates[0],
        ownerId: trash.ownerId._id,
        type: trash.type,
      }))
    );
  },[untouchableDataBackend])

  const uploadTrashPicture = (event) => {
    if (event.target.files.length > 0) {
      if (event.target.files[0].size < 11104900) {
        if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/i)){
          setError("You must upload an image (jpg|jpeg|png|gif)");
        }
        else{
          setNewImage(1)
          setFileToBase(event.target.files[0]);
        } 
      } else {
        setError("Image size must be < 10Mb");
      }
    }
  };

  const setFileToBase = (file) => {
    setImageName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicture(reader.result);
      //setData(data);
    };
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrLat(position.coords.latitude);
      setCurrLong(position.coords.longitude);
    });
  }, []);



  const openCloseModal = () => {
    if (openModalToggle) {
      setOpenModalToggle(false);
      emptyModalVariables();
    } else {
      setOpenModalToggle(true);
    }
  };
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleSelection = (event) => {
    setTrashSize(event.target.value);
  };

  const handleAccessTrash = (event) => {
    setAccessTrash(!accessTrash);
  };

  const emptyModalVariables = () => {
    setPicture("");
    setTrashSize("small");
    setType("");
    setImageName("");
    setError("");
    setPositionLat(0);
    setPositionLng(0);
    setDescription("")
    setAccessTrash(false)
    setIdTrash(-1);
    setError("");
  };

  const updateTrashSpot = (trash) => {
    openCloseModal();
    setIdTrash(trash._id);
    setPositionLat(trash.location.coordinates[0]);
    setPositionLng(trash.location.coordinates[1]);
    setPicture(trash.image.url);
    setTrashSize(trash.trashSize);
    setAccessTrash(trash.accessTrash);
    setDescription(trash.description);
    setType(trash.type);
    setAddMapMarker({})
    
  };

  const addAndUpdateUntouchableDataBackend = (trash) =>{
    const filteredCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
    let index = filteredCopy.findIndex((a) => a._id === trash._id);
    if (index>-1){
      const untouchableDataBackendCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
      untouchableDataBackendCopy[index] = trash;
      setUntouchableDataBackend(untouchableDataBackendCopy);
      setTrashSpots(
        untouchableDataBackendCopy.filter(trash => {
          if (trash.ownerId._id != id && trash.frontEndLevel=="primary") return trash;
        }))
    }else{
      let untouchableDataBackendCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
      untouchableDataBackendCopy.push(trash)
      setUntouchableDataBackend(untouchableDataBackendCopy.reverse())
      setTrashSpots(
        untouchableDataBackendCopy.reverse().filter(trash => {
          if (trash.ownerId._id != id && trash.frontEndLevel=="primary") return trash;
        }))
      setAddMapMarker({
        id: trash._id,
        longitude: trash.location.coordinates[1],
        latitude: trash.location.coordinates[0],
        ownerId: trash.ownerId._id,
        type: trash.type,
      })
      removeTrashFromMap(trash._id)
      setTrashMarks(()=>[...trashMarks,{
        id: trash._id,
        longitude: trash.location.coordinates[1],
        latitude: trash.location.coordinates[0],
        ownerId: trash.ownerId._id,
        type: trash.type,
      }])
      setUpdateTrigger(updateTrigger+1)
      window.location = "#trashSpotButtonsMyTrashSpots"
    }
    setAllTrashSpots(JSON.parse(JSON.stringify(untouchableDataBackend)))
    setTriggerWhichPage(1)
  }

  const deleteTrashSpot = async(trashSpots) => {
    await axios
      .post("https://he-bosses-pi-dev-api.onrender.com/api/deleteATrashSpot", {
        id: trashSpots._id,
      })
      .then((res) => {
        if (res.data) {
          removeTrashFromAllTrashSpots(res.data,trashSpots._id);
          //show notification
        } else {
        }
      });
  };

  const saveUpdateTrash = () => {
    if (picture != "") {
      if (type != "" && type != "other") {
        if (positionLat != 0) {
          let imagePlaceholder ="";
          if (newImage){
            imagePlaceholder = picture
          }
          axios
            .post("https://he-bosses-pi-dev-api.onrender.com/api/addTrashSpot", {
              idTrash: idTrash,
              image: imagePlaceholder,
              type: type,
              position: { long: positionLng, lat: positionLat },
              accessTrash: accessTrash,
              trashSize: trashSize,
              description: description,
            })
            .then((res) => {
              if (res.data != "error") {
                addAndUpdateUntouchableDataBackend(res.data)
                openCloseModal();
                emptyModalVariables();

                //show notification
              } else {
                setError(res.data);
              }
            });
        } else {
          setError("You need to choose a place");
        }
        setError("Please wait...");
      } else {
        setError("You need to select a type for the trash!");
      }
    } else {
      setError("A picture of the Trash is needed!");
    }
  };

  useEffect(()=>{
      if (updateTrigger==-2){
      showAllTrashSpotsSaufMine()
      }else{
        showMyTrashSpots()
      }
  },[updateTrigger])


  const swap_primary_secondary = (primary,secondary) =>{
    if (secondary){
        secondary.importanceLevel = "primary"
        let newSecondary = primary.secondary_spots.slice()
        newSecondary.splice(primary.secondary_spots.indexOf(secondary),1)
        newSecondary.push(primary)
        primary.secondary_spots = []
        secondary.secondary_spots = newSecondary.slice()
        const filteredCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
        setAllTrashSpots(filteredCopy)
        trashSpots.splice(trashSpots.indexOf(primary),1,secondary)
        setTrashSpots(trashSpots)
        setNewTrash([secondary,primary._id])
    }
  }

  const showTheRightTrash = (id,theTrash) =>{
    setRankingModel(0)
    const filteredCopy = JSON.parse(JSON.stringify(untouchableDataBackend));  
    if (theTrash!=""){
      setTrashSpots([theTrash])
    }else{
      setTrashSpots(filteredCopy.filter(trash => {
        if (trash._id == id ) return trash;
      })
      );
    }
  }

  const getSelectedPositionFromChild = (position) => {
    setPositionLat(position.lat);
    setPositionLng(position.long);
  };

  const openDialog = () => {
    document.getElementById("fileid").click();
  };
  
    useEffect(()=>{
      const filteredCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
        if (triggerWhichPage==0 && filteredCopy){
          setTrashSpots(
            filteredCopy.filter(trash => {
              if (trash.ownerId._id != id && trash.frontEndLevel=="primary") return trash;
            })
          );
        }if (triggerWhichPage==1 && filteredCopy){
          setTrashSpots(
            filteredCopy.filter(trash => {
              if (trash.ownerId._id == id && trash.frontEndLevel=="primary") return trash;
            })
          );
        }
        setTriggerWhichPage(-1)
    },[triggerWhichPage])

  const showMyTrashSpots = () => {
    setRankingModel(0)    
    const filteredCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
    setAllTrashSpots(filteredCopy)
    setTrashSpots(
      filteredCopy.filter(trash => {
        if (trash.ownerId._id == id && trash.frontEndLevel=="primary") return trash;
      })
    );
    setTriggerWhichPage(1)
  };


  const showAllTrashSpotsSaufMine = () => {
    setRankingModel(0)
    const filteredCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
    setAllTrashSpots(filteredCopy)
    setTrashSpots(
      filteredCopy.filter(trash => {
        if (trash.ownerId._id != id && trash.frontEndLevel=="primary") return trash;
      }))
    setTriggerWhichPage(0)
  };

  useEffect(()=> {
      setAllTrashSpots(JSON.parse(JSON.stringify(untouchableDataBackend)))
    setTrashSpots(
      JSON.parse(JSON.stringify(untouchableDataBackend)).filter(trash => {
        if (trash.ownerId._id == id && trash.frontEndLevel=="primary") return trash;
      })
    );
    setTriggerWhichPage(0)
    setTriggerWhichPage(1)
  },[untouchableDataBackend])

  const removeTrashFromAllTrashSpots = (trash,old_id) => {
    console.log(trash,old_id)
    setMapMarkerRemover(old_id)
    const filteredCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
    let index = filteredCopy.findIndex((a) => a._id === trash._id);
    if (trash['ownerId']) {
      if (index>-1){
        let untouchableDataBackendCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
        untouchableDataBackendCopy[index] = trash;
        setUntouchableDataBackend(JSON.parse(JSON.stringify(untouchableDataBackendCopy)));
        setDeleteRoundedAndCreateAnother([trash,old_id])
      }else{
        let untouchableDataBackendCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
        untouchableDataBackendCopy[untouchableDataBackendCopy.findIndex((a) => a._id === old_id)] = trash;
        setUntouchableDataBackend(JSON.parse(JSON.stringify(untouchableDataBackendCopy)));
        setDeleteRoundedAndCreateAnother([trash,old_id])
      }
    }else{
      let untouchableDataBackendCopy = JSON.parse(JSON.stringify(untouchableDataBackend));
      untouchableDataBackendCopy.splice(index, 1);
      setUntouchableDataBackend(JSON.parse(JSON.stringify(untouchableDataBackendCopy)))
    }
    setAllTrashSpots(JSON.parse(JSON.stringify(untouchableDataBackend)))
    setTriggerWhichPage(1)
    removeTrashFromMap(old_id)
    setDeleteRoundedAndCreateAnother([trash,old_id])
  };

  const removeTrashFromMap=(id)=>{
      setMapMarkerRemover(id)
  }




  const collectTrashUpdate = (trash) =>{
    addAndUpdateUntouchableDataBackend(trash)
  }

  const viewOnMap = (coords) =>{
      setJumpToMap(coords)
      setTimeout(()=>{
        setJumpToMap([0,0])
      },1)
  }
  if (props.user.isConnected && props.user.role == "PARTICULAR" ||  props.user.role == "ADMIN") {
  } else {
    return <NoAccess />;
  }


  return (
    <>
      <Navbar />
      <div className="d-flex ">
        <div className="leftSide bg-green-800" style={{ width: "710px","zIndex": 1 }}>
          <div className="container ">
            <div
              className="buttonsTrash bg-green-800"
            >
              <button
                className="trashSpotButtons btn"
                onClick={showAllTrashSpotsSaufMine}
              >
                All trash spots
              </button>
              <button
                className="trashSpotButtons btn"
                onClick={showMyTrashSpots}
                id="trashSpotButtonsMyTrashSpots"
              >
                My trash spots
              </button>
              <button
                className="trashSpotButtons btn "
                onClick={()=>setRankingModel(1)}
              >
                Ranking
              </button>
            </div>
            <div className="trashContainer">
            {trashSpots.length > 0 && !rankingModel ? //
              trashSpots.map((trash) => (
                <SpotCard
                  key={trash._id}
                  updateTrashSpot={updateTrashSpot}
                  trashSpots={trash}
                  removeTrashFromAllTrashSpots={removeTrashFromAllTrashSpots}
                  collectTrashUpdate = {collectTrashUpdate}
                  viewOnMap = {viewOnMap}
                  swap_primary_secondary = {swap_primary_secondary}
                  deleteTrashSpot = {deleteTrashSpot}
                ></SpotCard>
              )):
               ""
              }
              {rankingModel ?
                 <RankingTrashPage rankingPersons={rankingPersons}></RankingTrashPage>
                 :''
              }
              {trashSpots.length == 0 & !rankingModel ?
                <h1 style={{backgroundColor:"white"}}>No data yet! Stay tuned</h1>
              :''}
              </div>
          </div>
        </div>
        <MapTrashSpot
          currLat={currentLat}
          currLong={currentLong}
          getPosition={getSelectedPositionFromChild}
          openCloseModal={openCloseModal}
          trashMarks={trashMarks}
          showAllTrashSpotsSaufMine={showAllTrashSpotsSaufMine}
          showMyTrashSpots={showMyTrashSpots}
          myid={id}
          mapMarkerRemoverTrigger = {mapMarkerRemoverTrigger}
          addMapMarker = {addMapMarker} 
          jumpTo = {jumpToOnMap}
          newTrash = {newTrash}
          showTheRightTrash = {showTheRightTrash}
          deleteRoundedAndCreateAnother = {deleteRoundedAndCreateAnother}
        ></MapTrashSpot>
      </div>
      {openModalToggle === true && (
        <AddUpdateModal
          description={description}
          openCloseModal={openCloseModal}
          setDescription={setDescription}
          picture={picture}
          uploadTrashPicture={uploadTrashPicture}
          openDialog={openDialog}
          imageName={imageName}
          handleChange={handleChange}
          options={options}
          type={type}
          trashSize={trashSize}
          handleSelection={handleSelection}
          handleAccessTrash={handleAccessTrash}
          accessTrash={accessTrash}
          error={error}
          saveUpdateTrash={saveUpdateTrash}
          idTrash={idTrash}
        />
      )}
    </>
  );
}

export default TrashSpotHome;
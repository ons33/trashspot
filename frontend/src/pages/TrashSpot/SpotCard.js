import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import DeleteAcceptModal from "./DeleteAcceptModal";
import CollectModal from "./CollectModal";
import { format } from "date-fns";
import { icon } from "@fortawesome/fontawesome-svg-core";
const axiosWeather = axios.create()
function SpotCard(props) {
  const [temp, setTemp] = useState(0);
  const [iconWeather, setIconWeather] = useState(null);
  const [addressName, setAddressName] = useState("");

  useEffect(() => {
    getPos();
  }, []);

  const getPos = async () => {
    //   setCurrLat(position.coords.latitude);
    //   setCurrLong(position.coords.longitude);
    if (props.trashSpots.location.coordinates[0]) {
      const lat = props.trashSpots.location.coordinates[0];
      const long = props.trashSpots.location.coordinates[1];
      axiosWeather.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ed214b2a0a7749d0323ba717326fc4a7&units=metric`).then((res) => {
          if (res.data){
              setTemp(res.data.main.temp)
              setIconWeather(res.data.weather[0].icon)
              setAddressName(res.data.name)
          }
      });
      // await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ed214b2a0a7749d0323ba717326fc4a7&units=metric`
      // ).then((res) => {
      //   console.log("hethia res fetch", res.json());
      //   if (res.data) {
      //     setTemp(res.data.main.temp);
      //     setIconWeather(res.data.weather[0].icon);
      //     setAddressName(res.data.name);
      //   }
      // });
    }
  };
  function formatDate(date) {
    date = new Date(date);
    const currentMonth = date.getMonth() + 1;
    const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
    const currentDate = date.getDate();
    const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
    return `${date.getFullYear()}/${monthString}/${currentDate}`;
  }
  const token = localStorage.getItem("jwt");
  const id = jwt_decode(token).id;
  const [deleteTrash, setDeleteTrash] = useState(false);
  const [postedAt, setPostedAt] = useState("");
  const [collectTrash, setCollectTrash] = useState(false);
  const deleteTrashSpot = async () => {
    await props.deleteTrashSpot(props.trashSpots);
    setDeleteTrash(false);
  };
  const updateTrash = () => {
    props.updateTrashSpot(props.trashSpots);
  };

  useEffect(() => {
    if (props.trashSpots.collected) {
      setPostedAt(set_the_right_time(props.trashSpots.collected_at));
    } else {
      setPostedAt(set_the_right_time(props.trashSpots.createdAt));
    }
  }, [props.trashSpots.collected_at]);

  const jumpToMap = () => {
    props.viewOnMap(props.trashSpots.location.coordinates);
  };

  const set_the_right_time = (posted_at) => {
    var la_date = new Date().getTime() - new Date(posted_at).getTime();
    var days = Math.round(la_date / (1000 * 3600 * 24));
    var hours = Math.round(la_date / (1000 * 3600));
    var minutes = Math.round(la_date / (1000 * 60));
    if (days == 0 && hours == 0) {
      return minutes + "min ago";
    } else {
      if (days == 0) {
        return hours + "h ago";
      }
      return days + "d ago";
    }
  };

  const closeCollectModal = () => {
    setCollectTrash(false);
  };

  const collectTrashUpdate = (trash) => {
    props.collectTrashUpdate(trash);
  };

  return (
    <>
      {/* {props.trashSpots.importanceLevel =="primary" && */}

      <div
        id={props.trashSpots._id}
        className="container mt-2"
        style={{ zIndex: 5 }}
      >
        <div className="card" style={{ width: "100%" }}>
          {props.trashSpots.collected ? (
            <div className="d-flex ">
              <div className="w-50">
                <h5 className="imageBefore">Before</h5>
                <img
                  className="card-img-top"
                  src={props.trashSpots.image.url}
                  style={{ height: "340px", borderBottom: ".5px black solid" }}
                  alt="Card image cap"
                />
              </div>
              <div className="w-50">
                <h5 className="imageAfter">After</h5>
                <img
                  className="card-img-top imageAfterImage"
                  src={props.trashSpots.collected_image.url}
                  style={{ height: "340px", borderBottom: ".5px black solid" }}
                  alt="Card image cap"
                />
              </div>
            </div>
          ) : (
            <img
              className="card-img-top"
              src={props.trashSpots.image.url}
              style={{ height: "340px", borderBottom: ".5px black solid" }}
              alt="Card image cap"
            />
          )}
          <div className="card-body">
            <div className="uploaderInformation d-flex justify-content-between">
              <a
                className="d-flex"
                href={"/formTrash/" + props.trashSpots.ownerId._id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  src={props.trashSpots.ownerId.image.url}
                  style={{ borderRadius: "50%", width: "70px" }}
                  referrerPolicy="no-referrer"
                />
                <h4
                  className="align-self-center"
                  style={{ textAlign: "center" }}
                >
                  &nbsp; {props.trashSpots.ownerId.firstName} &nbsp;{" "}
                  {props.trashSpots.ownerId.lastName}
                </h4>
              </a>
              {props.trashSpots.secondary_spots.length ? (
                <div>
                  <p style={{ marginTop: "-10px" }}>
                    {props.trashSpots.secondary_spots.length + 1} Trash posted
                    in (1km²)
                  </p>
                  <select
                    className="align-self-center selectTrashSpot"
                    onChange={(e) => {
                      props.swap_primary_secondary(
                        props.trashSpots,
                        props.trashSpots.secondary_spots[e.target.value]
                      );
                    }}
                  >
                    <option>{props.trashSpots.type}</option>
                    {/* {formatDate(props.trashSpots.createdAt)} - {formatDate(props.trashSpots.collected_at)} */}
                    {props.trashSpots.secondary_spots.map(
                      (secondary, index) => (
                        <option value={index} key={secondary._id}>
                          {secondary.type}
                        </option>
                      )
                      // {formatDate(secondary.createdAt)} - {formatDate(secondary.collected_at)}
                    )}
                  </select>
                </div>
              ) : (
                ""
              )}
              <p className="align-self-center">
                {props.trashSpots.collected ? "Collected " : "Posted "}{" "}
                {postedAt}
              </p>
            </div>
            <div className="d-flex justify-content-around mt-3 mb-3">
              <p className="card-title">
                <b>Trash Type:</b> {props.trashSpots.type}
              </p>
              <p className="card-text">
                <b>Trash Size:</b> {props.trashSpots.trashSize}
              </p>
              <p className="card-text">
                <b>Accessibility</b>:{" "}
                {props.trashSpots.accessTrash == false
                  ? "Accessible"
                  : "Hard to access"}
              </p>
            </div>
            {props.trashSpots.description && (
              <p className="d-flex justify-content-start">
                <b>Description: &nbsp; </b>
                {props.trashSpots.description}
              </p>
            )}

            <div className="d-flex justify-content-end">
              <h6>{addressName}</h6>
              <div className="weather-icon" style={{ marginTop: "-15px" }}>
                <img
                  src={`http://openweathermap.org/img/w/${iconWeather}.png`}
                />
              </div>
              <h6>{temp}Deg</h6>
            </div>
            {id != props.trashSpots.ownerId._id ? (
              <div className="d-flex justify-content-between">
                {props.trashSpots.collected ? (
                  <p
                    className="align-self-center trashCollectedBy"
                    style={{ marginBottom: "2px" }}
                  >
                    Trash Collected by{" "}
                    <b>
                      {props.trashSpots.collected_by.firstName}{" "}
                      {props.trashSpots.collected_by.lastName}
                    </b>
                  </p>
                ) : (
                  <p></p>
                )}
                <button className="btn btn-primary" onClick={jumpToMap}>
                  View on map
                </button>
                <button
                  className="btn btn-success"
                  disabled={props.trashSpots.collected}
                  value={"text"}
                  onClick={() => setCollectTrash(!collectTrash)}
                >
                  {props.trashSpots.collected ? "Collected" : "Collect"}
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <button
                  onClick={() => setDeleteTrash(true)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                {deleteTrash && (
                  <DeleteAcceptModal
                    setDeleteTrash={setDeleteTrash}
                    deleteTrashSpot={deleteTrashSpot}
                  ></DeleteAcceptModal>
                )}
                {!props.trashSpots.collected && (
                  <button className="btn btn-warning" onClick={updateTrash}>
                    Update
                  </button>
                )}
                {props.trashSpots.collected && (
                  <p className="mt-1">
                    Trash Collected by{" "}
                    <b>
                      {props.trashSpots.collected_by.firstName}{" "}
                      {props.trashSpots.collected_by.lastName}
                    </b>
                  </p>
                )}
                <button className="btn btn-primary" onClick={jumpToMap}>
                  View on map
                </button>
                {props.trashSpots.collected ? (
                  <button className="btn btn-success" disabled>
                    Collected
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => setCollectTrash(!collectTrash)}
                  >
                    Collect
                  </button>
                )}
              </div>
            )}
            {collectTrash && (
              <CollectModal
                collectTrashUpdate={collectTrashUpdate}
                myid={id}
                closeCollectModal={closeCollectModal}
                trash={props.trashSpots}
              ></CollectModal>
            )}
          </div>
        </div>
      </div>
      {/* } */}
    </>
  );
}

export default SpotCard;

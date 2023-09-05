import React, { useState } from "react";
import Modal from "react-modal";
import EmojiRating from "react-emoji-rating";
import { FaStar } from "react-icons/fa";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

function SideButton({ user }) {
  const [hover, setHover] = useState(false);
  const token = localStorage.getItem("jwt");
  const id = jwt_decode(token).id;
  console.log("hedha id" + id);
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300,
      color: "black",
    },
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    },
    icon: {
      position: "fixed",
      right: 20,
      bottom: 20,
      width: 50,
      height: 50,
      borderRadius: "50%",
      color: "#24b765",
      fontSize: 50,
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
      transform: hover ? "rotate(90deg)" : "rotate(0deg)",
    },
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      marginTop: "50px",
      marginBottom: "50px",
      transform: "translate(-50%, -50%)",
      BorderColr: "black",
    },
  };
  const { t } = useTranslation();
  const [star, setstar] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [experience, setExp] = useState("");
  const [finished, setFinished] = useState(false);

  const stars = Array(5).fill(0);
  console.log("*=" + star);
  const handleClick = (value) => {
    setstar(value);
    console.log("nejma" + value);
  };
  const handleHover = () => {
    setHover(!hover);
  };
  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function handleRating(rating) {
    console.log("RATING -> " + rating);
    return rating;
  }
  function handleDesc(e) {
    setExp(e.target.value);
    console.log(experience);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = async () => {
    try {
      const response = await fetch("/rate/addRating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ experience, star, id }),
      });
      setFinished(true);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ cursor: "pointer" }}>
      <i
        class={hover != true ? "fas fa-smile-wink" : "fas fa-grin-squint-tears"}
        onClick={() => openModal()}
        style={styles.icon}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      ></i>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <i
          class="fa fa-times"
          style={{ color: "Red", cursor: "pointer", float: "right" }}
          onClick={() => closeModal()}
        ></i>

        {!finished ? (
          <div style={styles.container}>
            <h2
              className="text-xxl"
              style={{ marginTop: "25px", marginBottom: "25px" }}
            >
              {" "}
              {t("Rate your Experience!")}{" "}
            </h2>
            <div style={styles.stars}>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    color={
                      (hoverValue || star) > index ? colors.orange : colors.grey
                    }
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
            <textarea
              placeholder="What's your experience?"
              style={styles.textarea}
              onChange={handleDesc}
              value={experience}
            />

            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-32 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleSubmit()}
            >
              {t(" Submit")}
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <i
              className="fas fa-check-circle"
              style={{
                color: "#24b765",
                fontSize: "3em",
                marginBottom: "20px",
              }}
            ></i>
            <h2
              className="text-xxl"
              style={{ marginTop: "0", marginBottom: "20px" }}
            >
              {t("Thank you for submitting!")}
            </h2>
            <p style={{ fontSize: "1.2em" }}>
              {t("Your feedback has been received")}.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default SideButton;

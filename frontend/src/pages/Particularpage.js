import React from "react";
import { Logout } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import backgroundImage from "../assets/img/landpage.png";
import jwt_decode from "jwt-decode";
import Navbar from "../components/ReusableComponents/components/Navbars/UserNavbar";
import zero from "../assets/img/zero.png";
import rec from "../assets/img/rec.png";
import img1 from "../assets/img/img1.png";
import img2 from "../assets/img/img2.png";
import img3 from "../assets/img/img3.png";
import img4 from "../assets/img/img4.png";
import SideButton from "./sideButton";
import doc from "../assets/img/doc.png";
import docc from "../assets/img/ii.jpg";

function Particularpage(props) {
  const dispatch = useDispatch();
  const LogoutHanlder = () => {
    dispatch(Logout());
  };
  console.log(localStorage.getItem("jwt"));
  const token = localStorage.getItem("jwt");
  console.log(jwt_decode(token));
  const id = jwt_decode(token).id;
  return (
    <>
      <Navbar />
      <main>
        {/* 
      
        <Link
          className="btn btn-outline-primary"
          to={`/formPart/${id}`}
        >
          Profile
        </Link> */}
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75  top-0 w-full h-full bg-center bg-cove"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              width: "0px",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-right flex flex-wrap ">
              <div className="w-full lg:w-6/12 px-4 ">
                <div className="pr-12">
                  <h1
                    className=" font-semibold text-4xl "
                    style={{
                      color: "#2aafbe",
                    }}
                  >
                    Welcome to Zero Waste.
                  </h1>
                  <p className="mt-4 text-lg ">
                    This is a simple example of a Landing Page you can build
                    using Notus React. It features multiple CSS components based
                    on the Tailwind CSS design system.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Products</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Divide details about your product or agency work into
                      parts. A paragraph describing a feature will be enough.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Recipes</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Keep you user engaged by providing meaningful information.
                      Remember that by this time, the user is curious.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">TrashSpot</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Write a few lines about each one. A paragraph describing a
                      feature will be enough. Keep you user engaged!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  ZeroWaste Products
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                At our organization, we are committed to tackling the pressing issue of food waste. Our aim is to minimize food waste at every step of the process, from production to consumption. We believe that food is a precious resource that should not be squandered, and we are dedicated to implementing sustainable practices that prevent unnecessary waste. Through careful planning, efficient operations, and collaboration with our partners and customers, we strive to reduce our environmental impact and create a more sustainable food system.
                </p>
                
                
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src={zero}
                    className="w-full align-middle rounded-t-lg"
                  />
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-green-500 fill-current"
                    ></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">TrashSpot</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  allows everyone to become an actor in the protection of their
                  environment
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={img1}
                    className="shadow-lg rounded-full mx-auto max-w-230-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">
                      have you found any waste?
                    </h5>
                    <p className="mt-1 text-sm text-blueGray-400  font-semibold">
                      report them with the function I spotted
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={img2}
                    className="shadow-lg rounded-full mx-auto max-w-230-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">
                      Hhave you made a pickup?
                    </h5>
                    <p className="mt-1 text-sm text-blueGray-400  font-semibold">
                      Take pictures of the collected waste to get pointes
                    </p>
                    {/* <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={img3}
                    className="shadow-lg rounded-full mx-auto max-w-210-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">
                      Your actions are worth money
                    </h5>
                    <p className="mt-1 text-sm text-blueGray-400  font-semibold">
                      Each of your actions will bring back points
                    </p>
                    {/* <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={img4}
                    className="shadow-lg rounded-full mx-auto max-w-210-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">
                      Acting with an association?
                    </h5>
                    <p className="mt-1 text-sm text-blueGray-400  font-semibold">
                      participate with the associations to collect larger scale
                    </p>
                    {/* <div className="mt-6">
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       

        <div>
          <SideButton />
        </div>
        <section className="pb-20 relative block bg-blueGray-800" style={{marginTop:"-5%"}}>
        <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
             
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
             
              </svg>
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4" style={{marginTop:"5%", width:"40%" , marginLeft:"-10%"}}>
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-xl"
                  style={{
                    transform:
                      "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                  }}                  // src="https://img.freepik.com/premium-vector/people-recycling-with-trash-bin_23-2148524155.jpg"
                  src={rec}
                />
              </div>

              <div className="w-full md:w-5/12 ml-auto mr-auto px-4" style={{}}>
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold text-white">ZeroWaste Recipes</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Our web application is focused on reducing food waste by providing users with antiwaste and zero waste recipes. We prioritize using every part of an ingredient to reduce waste and promote sustainable practices such as using reusable containers and buying ingredients in bulk                  

                  </p>
                  <ul className="list-none mt-6">
                 
                  
                  
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
        style={{
          backgroundImage: `url(${doc})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "2000px",
          marginTop: "-19%",
        }}
      >
        <div className="containerrr mx-auto px-4 pb-32 pt-48">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
              <div className="md:pr-12" style={{ marginTop: "40%" }}>
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i class="fas fa-exclamation-triangle text-xl text-yellow-500"></i>{" "}
                </div>
                <h3 className="text-3xl font-semibold text-white">
                  Food waste in Tunisia
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white">
                  According to official figures dating back to 2020, nearly 572
                  million dinars worth of food products are wasted each year by
                  Tunisian households.
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div></div>
                      <div>
                        <h4 className="mt-4 text-lg leading-relaxed text-white">
                          You , me and everyone who wants it, we are capable of
                          reducing this number!
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  marginTop: "210px",
                  marginLeft: "40px",
                  transform:
                    "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                }}
                src={docc}
              />
            </div>
          </div>
        </div>
      </section>
        {/* <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to work with us?
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Particularpage;

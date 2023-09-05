import React from "react";
import "../assets/styles/tailwind.css";
import backgroundImage from "../assets/img/register_bg_2.png";
import { useDispatch, useSelector } from "react-redux";
import { Registration } from "../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Inputs from "../components/Inputs";

import "../assets/styles/index.css";
export default function Register() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errors = useSelector((state) => state.errors);
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(Registration(form, navigate));
    console.log(form);
  };

  return (
    <>
      <main>
        <section className="relative w-full  py-40 min-h-screen">
          <div
            className="absolute top-0 w-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${backgroundImage})`,

              backgroundSize: "cover",
            }}
          >
            <div
              className="container mx-auto px-4 h-full"
              style={{
                backgroundColor: "transparent",
                marginTop: "5%",
              }}
            >
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="text-center mb-3">
                        <h6 className="text-blueGray-500 text-sm font-bold">
                          Sign up with
                        </h6>
                      </div>
                      <div className="btn-wrapper text-center">
                        <button
                          className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                          type="button"
                        >
                          <img
                            alt="..."
                            className="w-5 mr-1"
                            src={require("../assets/img/github.svg").default}
                          />
                          Github
                        </button>
                        <button
                          className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                          type="button"
                        >
                          <img
                            alt="..."
                            className="w-5 mr-1"
                            src={require("../assets/img/google.svg").default}
                          />
                          Google
                        </button>
                      </div>
                      <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <div className="text-blueGray-400 text-center mb-3 font-bold">
                        <small>Or sign up with credentials</small>
                      </div>
                      <form
                        method="POST"
                        class="register-form"
                        id="register-form"
                        onSubmit={onSubmit}
                      >
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            First name
                          </label>
                          <Inputs
                            name="firstName"
                            type="text"
                            placeholder="Your firstName"
                            onChangeHandler={onChangeHandler}
                            errors={errors.firstName}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Name
                          </label>
                          <Inputs
                            name="lastName"
                            type="text"
                            placeholder="Your lastName"
                            onChangeHandler={onChangeHandler}
                            errors={errors.lastName}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <Inputs
                            name="email"
                            type="text"
                            placeholder="Your Email"
                            onChangeHandler={onChangeHandler}
                            errors={errors.email}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <Inputs
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChangeHandler={onChangeHandler}
                            errors={errors.password}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            confirm
                          </label>
                          <Inputs
                            name="confirm"
                            type="password"
                            placeholder="Repeat your password"
                            onChangeHandler={onChangeHandler}
                            errors={errors.confirm}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            You are
                          </label>

                          <div
                            className="flex "
                            style={{
                              justifyContent: "center",
                            }}
                          >
                            <div className="form-check">
                              <label
                                htmlFor="PARTICULAR"
                                className="font-bold text-xs ease-linear"
                              >
                                <img
                                  style={{ width: "100px" }}
                                  alt="..."
                                  className="w-5 mr-1"
                                  src={require("../assets/img/userr.png")}
                                />
                                <input
                                  type="radio"
                                  name="role"
                                  value="PARTICULAR"
                                  className="form-check-input"
                                  id="PARTICULAR"
                                  onChange={onChangeHandler}
                                />{" "}
                                A particular
                              </label>
                            </div>
                            <div className="form-check">
                              <label
                                htmlFor="PARTICULAR"
                                className="font-bold text-xs ease-linear"
                              >
                                <img
                                  style={{ width: "100px" }}
                                  alt="..."
                                  className="w-5 mr-1"
                                  src={require("../assets/img/superr.png")}
                                />
                                <input
                                  type="radio"
                                  name="role"
                                  value="PROFESSIONAL"
                                  className="form-check-input"
                                  id="PROFESSIONAL"
                                  onChange={onChangeHandler}
                                />{" "}
                                A partner
                              </label>
                            </div>
                            <div className="form-check">
                              <label
                                htmlFor="ASSOCIATION"
                                className="font-bold text-xs ease-linear"
                              >
                                <img
                                  alt="..."
                                  className=""
                                  src={require("../assets/img/ass.png")}
                                  style={{ width: "106px" }}
                                />
                                <input
                                  type="radio"
                                  name="role"
                                  value="ASSOCIATION"
                                  className="form-check-input"
                                  id="ASSOCIATION"
                                  onChange={onChangeHandler}
                                />{" "}
                                An association
                              </label>
                            </div>

                            {/* <Inputs  type="radio" id="user" name="role"  value="admin"  className="form-check-input" onChangeHandler={onChangeHandler}/> */}

                            {/* <Inputs  type="radio" id="admin" name="role"   value="admin" className="form-check-input" onChangeHandler={onChangeHandler} /> */}
                          </div>
                        </div>

                        <div>
                          <label className="inline-flex items-center cursor-pointer">
                            <Inputs
                              id="customCheckLogin"
                              type="checkbox"
                              className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            />
                            <span className="ml-2 text-sm font-semibold text-blueGray-600">
                              I agree with the{" "}
                              <a
                                href="#pablo"
                                className="text-lightBlue-500"
                                onClick={(e) => e.preventDefault()}
                              >
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                        </div>

                        <div className="text-center mt-6">
                          <button
                            type="submit"
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            name="signup"
                            id="signup"
                            value="Register"
                          >
                            Create Account
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="w-1/2 ">
                    <Link to="/login" className="text-blueGray-200">
                      <small>I have account</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

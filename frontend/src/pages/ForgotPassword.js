import React, { useState } from "react";
import backgroundImage from "../assets/img/register_bg_2.png";
import Inputs from "../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPass } from "../redux/actions/authActions";
function ForgotPassword() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(ForgotPass(form, navigate));
  };
  return (
    <>
      <main>
        <section
          className="relative w-full h-full py-40 min-h-screen bg-blueGray-800 bg-no-repeat bg-ful"
          style={{
            backgroundImage: `url(${backgroundImage})`,

            backgroundSize: "cover",
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${backgroundImage})`,

              backgroundSize: "cover",
            }}
          ></div>
          <div
            className="container mx-auto px-4 h-full"
            style={{
              backgroundColor: "transparent",
              marginTop: "5%",
            }}
          >
            <div className="flex content-center items-center justify-center h-full">
              <div
                className="w-full lg:w-4/12 px-4"
                style={{
                  marginTop: "-5%",
                }}
              >
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={onSubmit}>
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
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          onChangeHandler={onChangeHandler}
                          errors={errors.email}
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                          name="reset"
                        >
                          Send Email
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <Link to="/register" className="text-blueGray-200">
                      <small>Create new account</small>
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

export default ForgotPassword;

import React, { useState } from 'react';
import backgroundImage from '../assets/img/register_bg_2.png';
import Inputs from '../components/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginAction } from '../redux/actions/authActions';
import CaptchaCode from 'react-captcha-code';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import './Login.css'
import Profile from '../components/Profile';
export default function Login() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  console.log('errors ', errors);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [captchaCode, setCaptchaCode] = useState('');
  const [key, setKey] = useState(0);
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleCaptchaCode = (code) => {
    setCaptchaCode(code);
    setError(false);
  };

  const handleRegenerate = () => {
    setKey(key + 1);
    setCaptchaCode('');
    setError(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(form, navigate));
    const inputCode = e.target.elements.code.value;

    if (
      (dispatch(LoginAction(form, navigate)) && inputCode === captchaCode) ||
      inputCode === captchaCode
    ) {
      console.log('Verification successful!');
      setError(false);
    } else {
      console.log('Verification failed. Please try again.');
      setError(true);
    }
  };
  return (
    <>
      <main>
        <section
          className="relative w-full h-full py-40 min-h-screen bg-blueGray-800 bg-no-repeat bg-ful"
          style={{
            backgroundImage: `url(${backgroundImage})`,

            backgroundSize: 'cover',
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${backgroundImage})`,

              backgroundSize: 'cover',
            }}
          ></div>
          <div
            className="container mx-auto px-4 h-full"
            style={{
              backgroundColor: 'transparent',
              marginTop: '5%',
            }}
          >
            <div className="flex content-center items-center justify-center h-full">
              <div
                className="w-full lg:w-4/12 px-4"
                style={{
                  marginTop: '-5%',
                }}
              >
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-blueGray-500 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <a
                        href="https://he-bosses-pi-dev-api.onrender.com/auth/facebook"
                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require('../assets/img/icons8-facebook.svg').default}
                        />
                        facebook
                      </a>
                      <a
                        href="https://he-bosses-pi-dev-api.onrender.com/auth/google"
                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require('../assets/img/google.svg').default}
                        />
                        Google
                      </a>
                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                      <small>Or sign in with credentials</small>
                    </div>
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
                          label="Password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          onChangeHandler={onChangeHandler}
                          errors={errors.password}
                        />
                        <div style={{ color: errors.banned ? "red" : "transparent" }}>You are banned</div>
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          />
                          <span className="ml-2 text-sm font-semibold text-blueGray-600">
                            Remember me
                          </span>
                        </label>
                      </div>
                      <div>
                        <CaptchaCode key={key} onChange={handleCaptchaCode} />

                        <FontAwesomeIcon
                          style={{ cursor: 'pointer' }}
                          icon={faRedoAlt}
                          onClick={handleRegenerate}
                        />
                        <input
                          style={{ color: 'black' }}
                          type="text"
                          name="code"
                          placeholder="Enter the code above"
                        />
                        {error && (
                          <div style={{ color: 'red' }}>
                            Incorrect code entered. Please try again.
                          </div>
                        )}
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                          name="signin"
                        >
                          Sign In
                        </button>
                      </div>
                      <div className="text-center mt-6">
                        <button
                        type="button"
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          name="faceId"
                          style={{ backgroundColor: ' #2dce89' }}
                          onClick={handleShow}
                        >
                          Use Face ID
                        </button>
                      </div>
                      
                      <div className='backGroundModal' style={showModal?{"display":"block"}:{"display":"none"}}>

                      </div>
                      <Profile show={showModal} handleClose={handleClose} />
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <Link to="/forgotPassword" className="text-blueGray-200">
                      <small>Forgot password?</small>
                    </Link>
                  </div>
                  <div className="w-1/2 text-right">
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

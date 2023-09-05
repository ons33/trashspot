import React, { useEffect, useState } from 'react';
import Inputs from '../components/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import Classnames from 'classnames';

import { useParams } from 'react-router-dom';

import {
  AddProfile,
  GetProfile,
  UpdateProfile,
} from '../redux/actions/profileActions';

//------------- imports

import Navbar from '../components/ReusableComponents/components/Navbars/AuthNavbar';
import Footer from '../components/ReusableComponents/components/Footers/Footer';
import { SET_PROFILE } from '../redux/types';

function Profile() {
  let userId = useSelector((state) => state.auth.user.id);
  console.log('userId');
  let connectedUserId = useSelector((state) => state.auth.user.id);
  let { id } = useParams();
  id = id ? id : '';
  userId = id != '' ? id : userId;
  console.log('userID ', userId);
  const dispatch = useDispatch();
  const test = async () => {
    await dispatch(GetProfile(userId));
  };
  useEffect(() => {
    test();
  }, []);

  const user = useSelector((state) => state.profiles.profile);
  console.log('ijeni', user);

  //edit profile
  const [showText, setShowText] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleShowText = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setShowText(!showText);
  };

  const saveChanges = async () => {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    await dispatch(UpdateProfile(user));
  };
  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: 'translateZ(0)' }}
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
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require('../assets/img/team-2-800x800.jpg')}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Connect
                      </button>
                      {connectedUserId == userId ? (
                        <>
                          {!showText ? (
                            <>
                              <button
                                className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleShowText}
                              >
                                Edit
                              </button>
                            </>
                          ) : (
                            <button
                              className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                handleShowText();
                                saveChanges();
                              }}
                            >
                              Save changes
                            </button>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Friends
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Photos
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  {/* FIRST NAME & LAST NAME */}
                  {!showText ? (
                    <>
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        {user.firstName} {user.lastName}
                      </h3>
                      {/* EMAIL */}
                      <div className="mb-2 text-blueGray-600 mt-10">
                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                        {user.email}
                      </div>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{' '}
                        Los Angeles, California
                      </div>
                    </>
                  ) : (
                    <div>
                      <label>
                        First Name:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                      </label>
                      <label>
                        Last Name:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                      </label>
                      <label>
                        Email:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-lightBlue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Profile;

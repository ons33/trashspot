import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { LoginFbGoogleAction } from '../redux/actions/authActions';

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function LoggedFBG({user1}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if(user1){
  console.log(user1)

    dispatch(LoginFbGoogleAction(user1,navigate));
  }
    return ;
  const logout = () => {
    window.open("https://he-bosses-pi-dev-api.onrender.com/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Lama App
        </Link>
      </span>
      {user1 ? (
        <ul className="list">
          <li className="listItem">
            <img
              referrerpolicy="no-referrer"
              src={user1.provider === 'facebook' ? user1.photos[0].value : user1.image.url}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user1.provider === 'facebook' ? user1.displayName:user1.firstName+' '+user1.lastName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};


export default LoggedFBG
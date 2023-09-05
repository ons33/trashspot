import axios from 'axios';
import { ERRORS, SET_USER } from '../types';
import jwt_decode from 'jwt-decode';
import { setAuth } from '../../util/setAuth';

export const Registration = (form, navigate) => (dispatch) => {
  axios
    .post('https://he-bosses-pi-dev-api.onrender.com/api/register', form)
    .then((res) => {
      navigate("/verification?email="+form.email);
      dispatch({
        type: ERRORS,
        payload: {},
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};


export const VerifValidation = (id,token, navigate) => (dispatch) => {
  axios
    .get(`https://he-bosses-pi-dev-api.onrender.com/api/verify/${id}/${token}`)
    .then((res) => {
      
      const { token } = res.data;
      localStorage.setItem('jwt', token);
      const decode = jwt_decode(token);
      console.log(decode);
      dispatch(setUser(decode));
      setAuth(token);
      navigate("/verified");
    })
    .catch((err) => {
      navigate("/notVerified");
    });
};


export const LoginAction = (form, navigate) => (dispatch) => {
  axios
    .post('https://he-bosses-pi-dev-api.onrender.com/api/login', form)
    .then((res) => {
      console.log(res);
      const { token } = res.data;
      localStorage.setItem('jwt', token);
      const decode = jwt_decode(token);
      console.log(decode);
      dispatch(setUser(decode));
      setAuth(token);
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

export const LoginFbGoogleAction = (form, navigate) => (dispatch) => {
  axios
    .post('https://he-bosses-pi-dev-api.onrender.com/api/LoginFbGoogle', form)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwt', token);
      const decode = jwt_decode(token);
      console.log(decode);
      dispatch(setUser(decode));
      setAuth(token);
      navigate("/");
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
      navigate("/login");
    });
};


export const Logout = () => (dispatch) => {
  localStorage.removeItem('jwt');
  dispatch({
    type: SET_USER,
    payload: {},
  });
};

export const setUser = (decode) => ({
  type: SET_USER,
  payload: decode,
});

export const ForgotPass = (form, navigate) => (dispatch) => {
  axios
    .post('https://he-bosses-pi-dev-api.onrender.com/api/forgotpassword', form)
    .then((res) => {
      navigate('/login');
      dispatch({
        type: ERRORS,
        payload: {},
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};



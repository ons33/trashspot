// actions.js

import axios from 'axios';
import {
  ADD_TO_BASKET_REQUEST,
  ADD_TO_BASKET_SUCCESS,
  ADD_TO_BASKET_FAILURE,
  GET_BASKET_REQUEST,
  GET_BASKET_SUCCESS,
  GET_BASKET_FAILURE,
  PUT_BASKET_REQUEST,
  PUT_BASKET_SUCCESS,
  PUT_BASKET_FAILURE,
  DELETE_BASKET_REQUEST,
  DELETE_BASKET_SUCCESS,
  DELETE_BASKET_FAILURE
} from '../types';

export const addToBasket = (productId, price, quantity, userId) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TO_BASKET_REQUEST });

    try {
      const response = await axios.post('https://he-bosses-pi-dev-api.onrender.com/basket/add', {
        productId,
        price,
        quantity,
        userId,
      });
      const basket = response.data;

      dispatch({ type: ADD_TO_BASKET_SUCCESS, payload: basket });
    } catch (error) {
      dispatch({ type: ADD_TO_BASKET_FAILURE, payload: error.message });
    }
  };
};

export const getBasket = (userId) => async (dispatch) => {
  dispatch({ type: GET_BASKET_REQUEST });

  try {
    const response = await axios.get(`https://he-bosses-pi-dev-api.onrender.com/basket/${userId}`);
    const basket = response.data;
    dispatch({ type: GET_BASKET_SUCCESS, payload: basket });
  } catch (error) {
    dispatch({ type: GET_BASKET_FAILURE, payload: error.message });
  }
};

/*export const updateBasket = (basket) => (dispatch) => {
    dispatch({type: PUT_BASKET_REQUEST});
    try {
        const response = axios.put('https://he-bosses-pi-dev-api.onrender.com/api/basket', basket);
        const basket = response.data;
        dispatch({type: PUT_BASKET_SUCCESS, payload: basket})
    } catch (error) {
        dispatch({type: PUT_BASKET_FAILURE, payload: error.message});
    }
}*/

export const updateBasket = (basket) => (dispatch) => {
  axios
    .put('https://he-bosses-pi-dev-api.onrender.com/basket', basket)
    .then((res) => {
      dispatch({ type: PUT_BASKET_SUCCESS, payload: basket });
    })
    .catch((err) => {
      dispatch({ type: PUT_BASKET_FAILURE, payload: err.message });
    });
};

export const deleteBasket = (basketId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_BASKET_REQUEST });

    try {
      const response = await axios.delete(
        `https://he-bosses-pi-dev-api.onrender.com/basket/${basketId}`
      );
      const basket = response.data;

      dispatch({ type: DELETE_BASKET_SUCCESS, payload: basket });
    } catch (error) {
      dispatch({ type: DELETE_BASKET_FAILURE, payload: error.message });
    }
  };
};

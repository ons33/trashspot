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
  DELETE_BASKET_FAILURE,
} from '../types';

const initialState = {
  basket: null,
  loading: false,
  error: null,
  basketItems: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_BASKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_BASKET_SUCCESS:
      return {
        ...state,
        basket: action.payload,
        loading: false,
        error: null,
      };
    case ADD_TO_BASKET_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_BASKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BASKET_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        basketItems: action.payload.products,
      };
    case GET_BASKET_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case PUT_BASKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PUT_BASKET_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        basketItems: action.payload.products,
      };
    case PUT_BASKET_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_BASKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_BASKET_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        basketItems: action.payload.products,
      };
    case DELETE_BASKET_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

import {
  SET_PRODUCT,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  DELETE_PRODUCT,
  GET_SINGLE_PRODUCT,
  UPDATE_PRODUCT
} from "../types";

const initialState = {
  product: {},
  products: [],
  error: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        products: state.products.filter((w) => w._id !== action.payload._id),
      };
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
}

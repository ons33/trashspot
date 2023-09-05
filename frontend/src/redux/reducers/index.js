import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import productReducer from "./productReducer";
import commentReducer from "./commentReducer";
import recipeReducer from "./recipeReducer";
import basketReducer from "./basketReducer";
import productListReducer from './productReducer';
import favorisReducer from "./favorisReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profiles: profileReducer,
  products: productReducer,
  comments: commentReducer,
  recipes: recipeReducer,
  basket: basketReducer,
  basketList: basketReducer,
  productList: productListReducer,


  favoris: favorisReducer
});

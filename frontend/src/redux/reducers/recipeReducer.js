import {
  CREATE_RECIPE,
    GET_RECIPE_BY_ID,
    GET_ALL_RECIPES,
    UPDATE_RECIPE,
    DELETE_RECIPE,
    RATE_RECIPE,
    GET_RECIPES_BY_INGREDIENT,
  } from '../actions/recipeActions';

  const initialState = {
    recipes: [],
    selectedRecipe: null,
  };
  
  const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_RECIPE:
        return {
          ...state,
          recipes: [...state.recipes, action.payload],
        };
      case GET_RECIPE_BY_ID:
        return {
          ...state,
          selectedRecipe: action.payload,
        };
      case GET_ALL_RECIPES:
        
        return {
          ...state,
          recipes: action.payload,
        };

        case GET_RECIPES_BY_INGREDIENT:

          return { 
            ...state, 
            recipes: action.payload
           };

      case UPDATE_RECIPE:
        return {
          ...state,
          recipes: state.recipes.map((recipe) =>
            recipe._id === action.payload._id ? action.payload : recipe
          ),
          selectedRecipe:
            state.selectedRecipe?._id === action.payload._id
              ? action.payload
              : state.selectedRecipe,
        };
      case DELETE_RECIPE:
        return {
          ...state,
          recipes: state.recipes.filter((recipe) => recipe._id !== action.payload._id),
          selectedRecipe:
            state.selectedRecipe?._id === action.payload._id ? null : state.selectedRecipe,
        };
      case RATE_RECIPE:
        return {
          ...state,
          selectedRecipe: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default recipeReducer;
  
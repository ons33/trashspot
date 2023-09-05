
import axios from 'axios';

const BASE_URL = 'https://he-bosses-pi-dev-api.onrender.com/recipe';

export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const RATE_RECIPE = 'RATE_RECIPE';
export const RATE_RECIPE_REQUEST = 'RATE_RECIPE_REQUEST';
export const RATE_RECIPE_SUCCESS = 'RATE_RECIPE_SUCCESS';
export const RATE_RECIPE_FAILURE = 'RATE_RECIPE_FAILURE';
export const GET_RECIPES_BY_INGREDIENT = 'GET_RECIPES_BY_INGREDIENT';

export const createRecipe = (recipe) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${BASE_URL}/add`, recipe);
      console.log("hedhy res ",res)
      dispatch({
        type: CREATE_RECIPE,
        payload: res.data,
      });
    

      return res.data;
     
  
    } catch (error) {
      console.error(error);
    }
  };
};
export const UploadImage = async (image, newRecipeId,navigate) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/uploadImageRecipe/${newRecipeId}`,
      { image }
    );
    if (response.status === 200){
      navigate("/admin")
    }
    console.log("Image uploaded successfully");
  } catch (error) {
    console.log("Error uploading image", error);
  }
};


// export const redirect = async (navigate) => {
//   navigate("/admin")
// };


export const getRecipesByIngredients = (ingredient) => async (dispatch) => {
  try {
    const res = await axios.get(`/recipe/${ingredient}`,
     {
   
    });
    dispatch({
      type: 'GET_RECIPES_BY_INGREDIENT',
      payload: res.data,
    });
     console.log("res",res.data)
  } catch (error) {
    console.log(error);
  }
};

export const UpdateImage = async (id, picture) => {
  
  const response = await axios.put(
    `https://he-bosses-pi-dev-api.onrender.com/recipe/updatePicture/${id}`,
    { image: picture }
  );
};

export const getRecipeById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}/get/${id}`);
      dispatch({
        type: GET_RECIPE_BY_ID,
        payload: res.data,
      });
      console.log(res.data)
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllRecipes = () => {
  return async (dispatch) => {
    try {
 
      const res = await axios.get(`${BASE_URL}/getall`);
      console.log("hhhhhhhhhhhhhhhhhhhhh",res.data)
      dispatch({
        type: GET_ALL_RECIPES,
        payload: res.data,
      
      });
    } catch (error) {
      console.error(error);
    }
  };
};
// export const getAllRecipes = () => async (dispatch) => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/getall`);
//       dispatch({
//         type: GET_ALL_RECIPES,
//         payload: data,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
export const updateRecipe = (id, updates) => {
  return async (dispatch) => {
    try {
      console.log("dakhlettttttttttttttt");
      const res = await axios.put(`${BASE_URL}/update/${id}`, updates);
      dispatch({
        type: UPDATE_RECIPE,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteRecipe = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete/${id}`);
      dispatch({
        type: DELETE_RECIPE,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const rateRecipe = (recipeId, rating) => async (dispatch) => {
  dispatch({ type: RATE_RECIPE_REQUEST });
console.log("recipeId",recipeId)
  try {
    const { data } = await axios.post(`${BASE_URL}/get/${recipeId}/rate`, { rating });

    dispatch({ type: RATE_RECIPE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: RATE_RECIPE_FAILURE,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : 'Failed to rate recipe',
    });
  }
};
// export const rateRecipe = (id, rating) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.post(`${BASE_URL}/recipes/${id}/rate`, rating);
//       dispatch({
//         type: RATE_RECIPE,
//         payload: res.data,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

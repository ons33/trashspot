import axios from "axios";

import {
  ERRORS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  DELETE_PRODUCT,
  GET_SINGLE_PRODUCT,
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL
} from "../types";

// export const AddProduct = (form, navigate) => async (dispatch) => {
//   await axios
//     .post("https://he-bosses-pi-dev-api.onrender.com/product/addProduct", form)
//     .then((res) => {
//       navigate("/productsCreated");
//       dispatch({
//         type: ERRORS,
//         payload: {},
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: ERRORS,
//         payload: err.response.data,
//       });
//     });
// };

// ------------------- SKANDER actions 
export const fetch_Products = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('https://he-bosses-pi-dev-api.onrender.com/product/getAllProducts');

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// -----------------

export const AddProduct = (form, idUser, navigate) => async (dispatch) => {
  const product = {
    ...form,
    username: idUser,
  };
  await axios
    .post("https://he-bosses-pi-dev-api.onrender.com/product/addProduct", product)
    .then((res) => {
      setTimeout(() => {
        console.log("Waited for 3 seconds");
        navigate("/productsCreated");
        dispatch({
          type: ERRORS,
          payload: {},
        });
      }, 3500); // 3000ms = 3 seconds
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

export const UploadImage = async (image) => {
  const response = await axios.post(
    `https://he-bosses-pi-dev-api.onrender.com/product/uploadImageProduct`,
    { image: image }
  );
};

export const fetchProducts = (idUser) => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://he-bosses-pi-dev-api.onrender.com/product/getProducts/" + idUser,
      {
        params: {
          random: Math.random(),
        },
      }
    );
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://he-bosses-pi-dev-api.onrender.com/product/getAllProducts",
      {
        params: {
          random: Math.random(),
        },
      }
    );
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const fetchAllFavoris = (idUser) => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://he-bosses-pi-dev-api.onrender.com/favoris/getFavoris/" + idUser
    );
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const fetchAllProducts1 =
  ({ minPrice, maxPrice }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        "https://he-bosses-pi-dev-api.onrender.com/product/getAllProductsFilter",
        {
          params: {
            random: Math.random(),
            minPrice,
            maxPrice,
          },
        }
      );
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_ERROR,
        payload: error.message,
      });
    }
  };

export const fetchAllProducts2 = (searchQuery) => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://he-bosses-pi-dev-api.onrender.com/product/getAllProducts",
      {
        params: {
          random: Math.random(),
        },
      }
    );
    const filteredProducts = res.data.filter(
      (product) =>
        product &&
        product.type &&
        product.type.toLowerCase().includes(searchQuery)
    );
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: filteredProducts,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const fetchAllProducts3 = (selectedCategories) => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://he-bosses-pi-dev-api.onrender.com/product/getAllProducts",
      {
        params: {
          random: Math.random(),
        },
      }
    );
    const filteredProducts = res.data.filter(
      (product) =>
        product &&
        //product.category in selectedCategories
        selectedCategories.includes(product.category)
    );
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: filteredProducts,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const fetchAllProducts5 = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://he-bosses-pi-dev-api.onrender.com/product/getAllProductsSortedByDate",
      {
        params: {
          random: Math.random(),
        },
      }
    );
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const fetchAllProducts4 = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://he-bosses-pi-dev-api.onrender.com/product/getAllProductsSortedByPrice",
      {
        params: {
          random: Math.random(),
        },
      }
    );
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const fetchAllProducts6 = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://he-bosses-pi-dev-api.onrender.com/product/getPromoProducts",
      {
        params: {
          random: Math.random(),
        },
      }
    );
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const deleteProduct = (id, navigate) => async (dispatch) => {
  try {
    const response = await axios.delete(
      "https://he-bosses-pi-dev-api.onrender.com/product/deleteProduct/" + id
    );

    if (response.status === 200) {
      navigate("/productsCreated");
      const json = response.data; // or response.json()

      dispatch({ type: DELETE_PRODUCT, payload: json });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct1 = (id, navigate) => async (dispatch) => {
  try {
    const response = await axios.delete(
      "https://he-bosses-pi-dev-api.onrender.com/product/deleteProduct/" + id
    );

    if (response.status === 200) {
      navigate("/allProducts");
      const json = response.data; // or response.json()

      dispatch({ type: DELETE_PRODUCT, payload: json });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleProduct = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://he-bosses-pi-dev-api.onrender.com/product/getSingleProduct/" + id
    );
    if (res.status === 200) {
      navigate("/updateProduct/" + id);
      dispatch({
        type: GET_SINGLE_PRODUCT,
        payload: res.data,
      });
      console.log(res.data);
    }
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const fetchSingleProduct1 = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://he-bosses-pi-dev-api.onrender.com/product/getSingleProduct/" + id
    );
    if (res.status === 200) {
      dispatch({
        type: GET_SINGLE_PRODUCT,
        payload: res.data,
      });
      console.log(res.data);
    }
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

// export const updateProduct = (id, data, navigate) => async (dispatch) => {
//   try {
//     const res = await axios.put(
//       `https://he-bosses-pi-dev-api.onrender.com/product/updateProduct/${id}`,
//       data
//     );
//     if (res.status === 200) {
//       navigate("/productsCreated");
//     }
//   } catch (error) {
//     dispatch({
//       type: FETCH_PRODUCTS_ERROR,
//       payload: error.message,
//     });
//   }
// };

export const updateProduct = (id, data, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://he-bosses-pi-dev-api.onrender.com/product/updateProduct/${id}`,
      data
    );
    if (res.status === 200) {
      setTimeout(() => {
        console.log("Waited for 3 seconds");
        navigate("/productsCreated");
      }, 3000); // 3000ms = 3 seconds
    }
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const UpdateImage = async (id, image) => {
  const response = await axios.put(
    `https://he-bosses-pi-dev-api.onrender.com/product/updatePicture/${id}`,
    { image: image }
  );
};

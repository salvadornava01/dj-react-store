import axios from "axios";
import cookie from "react-cookies"

import { CART_START, CART_SUCCESS, CART_PRODUCT_ADDED, CART_DELETE_ITEM, CART_FLUSH, CART_FAIL } from "./types";

export const cartStart = () => {
  return {
    type: CART_START
  };
};

export const cartSuccess = (cart_data, product_data) => {
  return {
    type: CART_SUCCESS,
    cart_data: cart_data,
    cart_product_added: product_data
  };
};

export const cartProductAdded = cart_product => {
  return {
    type: CART_PRODUCT_ADDED,
    cart_product_added: null
  }
}

export const cartFlush = () => {
  localStorage.removeItem("cart_items");
  return {
    type: CART_FLUSH,
    cart_data: {}
  }
}

export const cartDeleteItem = product_id => {
  let previous_cart = JSON.parse(localStorage.getItem("cart_items"));
  console.log(product_id)
  if (previous_cart[product_id].quantity > 1){
    previous_cart[product_id].quantity -= 1
  } else {
    delete previous_cart[product_id]
  }
  localStorage.setItem("cart_items", JSON.stringify(previous_cart));
  console.log(previous_cart)
  return {
    type: CART_DELETE_ITEM,
    cart_data: previous_cart
  };
};

export const cartFail = error => {
  return {
    type: CART_FAIL,
    error: error
  };
};

export const fetchCart = product_id => {
  return dispatch => {
    dispatch(cartStart());

    const endpoint = "/api/products/add-to-cart/";
    let data = {
      product_id: product_id
    };
    let csrfToken = cookie.load('csrftoken') 
    let axiosConfig  = {
      headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken
      }
    }
    axios
      .post(endpoint, data, axiosConfig)
      .then(function(response) {
        return response;
      })
      .then(function(responseData) {
        const product_data = responseData.data;
        const product_data_id = product_data.id

        let previous_cart = JSON.parse(localStorage.getItem("cart_items"));

        if (previous_cart === null) {
          localStorage.setItem("cart_items", JSON.stringify([]));
          previous_cart = {};
          previous_cart[product_data_id] = {
                              product_id: product_data.id,
                              product_data: product_data,
                              quantity:1
                            };                  
          dispatch(cartSuccess(previous_cart, product_data));
          dispatch(cartProductAdded(product_data));
          localStorage.setItem("cart_items", JSON.stringify(previous_cart));
        } else {
          if(previous_cart[product_data_id] === undefined){
            previous_cart[product_data_id] = {
                                          product_id: product_data.id,
                                          product_data: product_data,
                                          quantity:1
            };
          } else {
            previous_cart[product_data_id] = {
                                          product_id: product_data.id,
                                          product_data: product_data,
                                          quantity: previous_cart[product_data_id].quantity + 1
            };
          }
          dispatch(cartSuccess(previous_cart, product_data));
          dispatch(cartProductAdded(product_data));
          localStorage.setItem("cart_items", JSON.stringify(previous_cart));
        }
      })
      .catch(function(error) {
        console.log("An error ocurred", error.response.data);
        dispatch(cartFail(error));
      });
  };
};

export const cartCheckState = () => {
  return dispatch => {
    const cart = JSON.parse(localStorage.getItem("cart_items"));
    if (cart !== null) {
      // cart.map(cart_item => {
      //   return dispatch(cartSuccess(cart_item));
      // });
      dispatch(cartSuccess(cart));
    }
  };
};

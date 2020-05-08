import "whatwg-fetch";

import { GET_PRODUCTS, GET_PRODUCT_DETAIL } from "./types";

// GET PRODUCTS

export const getProducts = () => dispatch => {
  const endpoint = "/api/products/";
  let lookupOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  fetch(endpoint, lookupOptions)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseData) {
      dispatch({
        type: GET_PRODUCTS,
        payload: responseData
      });
    })
    .catch(function(error) {
      console.log("error", error);
    });
};

export const getProductDetail = id => dispatch => {
  const endpoint = `/api/products/productdetail/${id}`;
  let lookupOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  fetch(endpoint, lookupOptions)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseData) {
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: responseData
      });
    })
    .catch(function(error) {
      console.log("error", error);
    });
};
// loadProducts() {
//     const endpoint = "http://127.0.0.1:8000/";
//     let actual_obj = this;
//     let lookupOptions = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     };

//     fetch(endpoint, lookupOptions)
//       .then(function(response) {
//         return response.json();
//       })
//       .then(function(responseData) {
//         // console.log(responseData)
//         actual_obj.setState({
//           productlist: responseData
//         });
//       })
//       .catch(function(error) {
//         console.log("error", error);
//       });
//   }
// loadProducts(){
//     const endpoint = "http://127.0.0.1:8000/"
//     let actual_obj = this
//     axios.get(endpoint)
//     .then( responseData => {
//         // console.log(responseData)
//         actual_obj.setState({
//             productlist: responseData.data
//         })
//     })
// }

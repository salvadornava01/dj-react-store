import { GET_PRODUCTS, GET_PRODUCT_DETAIL } from "../actions/types.js";

const initialState = {
  products: [],
  product_detail: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state, // this ... include whatever else is in state
        products: action.payload
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        product_detail: action.payload
      };
    default:
      return state;
  }
}

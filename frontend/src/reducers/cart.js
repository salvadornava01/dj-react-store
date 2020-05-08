import {
  CART_START,
  CART_SUCCESS, 
  CART_PRODUCT_ADDED,
  CART_DELETE_ITEM,
  CART_FLUSH,
  CART_FAIL
} from "../actions/types";
import { updateObject } from "../store/utility";

const initialState = {
  cart_data: {},
  cart_product_added: null,
  error: null,
  loading: false
};

const cartStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const cartSucces = (state, action) => {
  return updateObject(state, {
    cart_data: action.cart_data,
    cart_product_added: action.cart_product_added,
    error: null,
    loading: false
  });
};

const cartProductAdded = (state, action) => {
  return updateObject(state, {
    cart_product_added: action.cart_product_added,
  })
}

const cartFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const cartDeleteItem = (state, action) => {
  return updateObject(state, {
    cart_data: action.cart_data
  });
};

const cartFlush = (state, action) => {
  return updateObject(state, {
    cart_data: action.cart_data
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_START:
      return cartStart(state, action);
    case CART_SUCCESS:
      return cartSucces(state, action);
    case CART_PRODUCT_ADDED:
      return cartProductAdded(state, action);
    case CART_FAIL:
      return cartFail(state, action);
    case CART_DELETE_ITEM:
      return cartDeleteItem(state, action);
    case CART_FLUSH:
      return cartFlush(state, action);
    default:
      return state;
  }
};

export default reducer;

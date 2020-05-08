import { combineReducers } from "redux";
import products from "./products";
import auth from "./auth";
import cart from "./cart";
import order from "./orderpayment"

export default combineReducers({
  products,
  auth,
  cart,
  order
});

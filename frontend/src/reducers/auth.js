import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_ANONYMOUS_CART,
  AUTH_DELETE_ANONYMOUS_CART,
  AUTH_GET_CLIENT_DATA,
  AUTH_START_GET_CLIENT_DATA,
  AUTH_SUCCESS_GET_CLIENT_DATA
} from "../actions/types";
import { updateObject } from "../store/utility";

const initialState = {
  token: null,
  anonymous_order: false,
  client_data: null,
  error: null,
  loading: false,
  getting_client_data: false
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSucces = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    getting_client_data: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    error: null
  });
};

const authAnonymousCart = (state) => {
  return updateObject(state, {
    anonymous_order: true
  })
}

const authDeleteAnonymousCart = (state) => {
  return updateObject(state, {
    anonymous_order: false
  })
}

const authGetClientData = (state, action) => {
  return updateObject(state, {
    client_data: action.client_data
  })
}

const startGetClientData = (state) => {
  return updateObject(state, {
    getting_client_data: true
  })
}

const successGetClientData = (state) => {
  return updateObject(state, {
    getting_client_data: false,
    error: null
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSucces(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    case AUTH_ANONYMOUS_CART:
      return authAnonymousCart(state);
    case AUTH_DELETE_ANONYMOUS_CART:
      return authDeleteAnonymousCart(state);
    case AUTH_GET_CLIENT_DATA:
      return authGetClientData(state, action)
    case AUTH_START_GET_CLIENT_DATA:
      return startGetClientData(state)
    case AUTH_SUCCESS_GET_CLIENT_DATA:
      return successGetClientData(state)
    default:
      return state;
  }
};

export default reducer;

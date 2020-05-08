import axios from "axios";
import cookie from "react-cookies"

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
} from "./types";

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error: error
  };
};

export const authAnonymousCart = () => {
  return {
    type: AUTH_ANONYMOUS_CART
  }
}

export const authDeleteAnonymousCart = () => {
  return {
    type: AUTH_DELETE_ANONYMOUS_CART
  }
}

export const startGetClientData = () => {
  return {
    type: AUTH_START_GET_CLIENT_DATA
  }
}
export const successGetClientData = () => {
  return {
    type: AUTH_SUCCESS_GET_CLIENT_DATA
  }
}

export const authClientData = (client_data) => {
  return {
    type: AUTH_GET_CLIENT_DATA,
    client_data: client_data
  }
}

export const checkAnonymousCartTimeout = (expirationTime) =>{
  return dispatch => {
    setTimeout(()=>{
      dispatch(authDeleteAnonymousCart())
      localStorage.removeItem("anonymousorder")
    }, expirationTime * 1000)
  }
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationDate => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());

    const endpoint = "/rest-auth/login/";
    let data = {
      username: username,
      password: password
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
        const token = responseData.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
        dispatch(authGetClientData())
        localStorage.removeItem("anonymousorder")
      })
      .catch(function(error) {
        let error_response = {}
        console.log("An error ocurred", error);
        if (error.response !== undefined){
          let error_messages = Object.keys(error.response.data).map(datakey => {return(error.response.data[datakey][0])})
           error_response.message = error_messages.join(" ")
          console.log(error_response.message)
          dispatch(authFail(error_response));
        } else{
          dispatch(authFail(error));
        }
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());

    const endpoint = "/rest-auth/registration/";
    let data = {
      username: username,
      email: email,
      password1,
      password2
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
        // console.log(response)
        return response;
      })
      .then(function(responseData) {
        const token = responseData.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(function(error) {
        let error_response = {}
        console.log("error", Object.keys(error));
        console.log(error.response)
        if (error.response !== undefined){
          let error_messages = Object.keys(error.response.data).map(datakey => {return(error.response.data[datakey][0])})
           error_response.message = error_messages.join(" ")
          console.log(error_response.message)
          dispatch(authFail(error_response));
        } else{
          dispatch(authFail(error));
        }
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            3600
          )
        );
      }
    }
  };
};

export const authStartAnonCart = () => {
  return dispatch => {
    localStorage.setItem("anonymousorder", true);
    dispatch(authAnonymousCart())
    dispatch(checkAnonymousCartTimeout(3600))
  }
}

export const authCheckAnonCart = () => {
  return dispatch => {
    const anonymousorder = localStorage.getItem("anonymousorder")
    if (anonymousorder !== null) {
      dispatch(authAnonymousCart())
      dispatch(checkAnonymousCartTimeout(3600))
    } else {
      dispatch(authDeleteAnonymousCart())
      localStorage.removeItem("anonymousorder")
    }
  }
}

export const authGetClientData = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(startGetClientData())
      const endpoint = "/api/clients/get-user-data/";
      let data = {
      token: token
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
      .then(function(response){
          return response
      })
      .then(function(responseData) {
          dispatch(authClientData(responseData.data))
          dispatch(successGetClientData())
      })
      .catch(function(error) {
        let error_response = {}
        if (error.response !== undefined){
          console.log("An error ocurred", error.response.data);
          let error_messages = Object.keys(error.response.data).map(datakey => {return(error.response.data[datakey][0])})
            error_response.message = error_messages.join(" ")
            console.log(error_response.message)
            dispatch(authFail(error_response));
          } else{
            dispatch(authFail(error));
          }
      })
    }
  }
}
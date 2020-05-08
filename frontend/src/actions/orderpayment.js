import axios from "axios"
import cookie from "react-cookies"

import {
    ORDER_PAYMENT_GET_SUCCESS,
    ORDER_PAYMENT_GET_DETAIL,
    START_ORDER_PAYMENT,
    ORDER_PAYMENT_POST_DETAIL,
    ORDER_PAYMENT_SUCCESS,
    ORDER_PAYMENT_FAIL
} from "./types"

export const orderGetDetailSuccess = (order_data, order_id) => {
    return {
        type: ORDER_PAYMENT_GET_SUCCESS,
        order_data: order_data,
        order_id: order_id
    }
}

export const orderStartPayment = (payment_method) => {
    return {
        type: START_ORDER_PAYMENT,
        payment_method: payment_method
    }
}

export const orderPaymentSuccess = (payment_data) => {
    return {
        type: ORDER_PAYMENT_SUCCESS,
        payment_data: payment_data,
    }
}

export const orderPaymentFail = error => {
    return {
        type: ORDER_PAYMENT_FAIL,
        error: error
    }
}

export const orderGetDetail = (order_id) => {
    return dispatch => {
        const endpoint = "/api/clients/get-order-data/"
        axios.get(endpoint, {
            params: {
                order_id: order_id
            }
        })
        .then(function(response){
            return response
        })
        .then(function(responseData) {
            let order_data = responseData.data
            dispatch(orderGetDetailSuccess(order_data, order_id))
        })
        .catch(function(error) {
            console.log("An error ocurred", error)
        })
    }
    
}

export const orderPaymentPostDetail = (order_id, payment_method=null, token=null) => {
    return dispatch => {
        const endpoint = "/api/clients/get-order-data/"
        let data = {
            order_id: order_id,
            payment_method: payment_method,
            token: token
        }
        let csrfToken = cookie.load('csrftoken')
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            }
        }
        dispatch(orderStartPayment(payment_method))
        axios
            .post(endpoint, data, axiosConfig)
            .then(function(response){
                return response
            })
            .then(function(responseData){
                dispatch(orderPaymentSuccess(responseData.data))
            })
            .catch(function(error) {
                if(error.response !== undefined)
                {
                    console.log("An error ocurred", error.response.data);
                    dispatch(orderPaymentFail(error.response.data))
                } else{
                    dispatch(orderPaymentFail(error.message))
                }
            })
    }
}
import {
    ORDER_PAYMENT_GET_SUCCESS,
    ORDER_PAYMENT_GET_DETAIL,
    START_ORDER_PAYMENT,
    ORDER_PAYMENT_POST_DETAIL,
    ORDER_PAYMENT_SUCCESS,
    ORDER_PAYMENT_FAIL
} from "../actions/types"
import { updateObject } from "../store/utility";

const initialState = {
    order_detail_available: false,
    order_id: null,
    order_data: {},
    payment_method: null,
    processing_payment: false,
    payment_progress: 0,
    payment_succeeded: false,
    payment_error:false,
    payment_data: {},
    errors: {}
}

const orderGetDetailSuccess = (state, action) => {
    return updateObject(state, {
        order_data: action.order_data,
        order_detail_available: true,
        order_id: action.order_id
    })
}

const orderGetDetail = (state, action) => {
    return updateObject(state, {
        order_detail_available: true
    })
}

const orderStartPayment = (state, action) => {
    return updateObject(state, {
        processing_payment: true,
        payment_succeeded: false,
        payment_progress: 50,
        payment_error: false,
        payment_method: action.payment_method
    })
}

const orderPaymentSuccess = (state, action) => {
    return updateObject(state, {
        processing_payment: false,
        payment_succeeded: true,
        payment_data: action.payment_data,
        payment_progress: 100,
        payment_error: false
    })
}

const orderPaymentFail = (state, action) => {
    return updateObject(state, {
        processing_payment:false,
        payment_succeeded: false,
        payment_error: true,
        errors: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ORDER_PAYMENT_GET_SUCCESS:
            return orderGetDetailSuccess(state, action)
        case ORDER_PAYMENT_GET_DETAIL:
            return orderGetDetail(state, action)
        case START_ORDER_PAYMENT:
            return orderStartPayment(state, action)
        case ORDER_PAYMENT_SUCCESS:
            return orderPaymentSuccess(state, action)
        case ORDER_PAYMENT_FAIL:
            return orderPaymentFail(state, action)
        default:
            return state
    }
}

export default reducer
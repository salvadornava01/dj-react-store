import React, { Component } from 'react'
import { orderGetDetail } from '../actions/orderpayment'
import { cartFlush } from '../actions/cart'
import OrderDetail from './OrderDetail'
import OrderCardTrace from './detailformats/OrderCardTrace'
import OrderOxxoTrace from './detailformats/OrderOxxoTrace'
import OrderSpeiTrace from './detailformats/OrderSpeiTrace'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Typography } from 'antd';
const { Title } = Typography;

class OrderTracing extends Component {

    componentDidMount(){
        if (this.props.match) {
            const { order_id } = this.props.match.params;
            this.props.getOrderDetail(order_id)
        }
        this.props.cartFlush()
    }

    switchPaymentMethod(method) {
        switch(method) {
            case 'card':
                return <OrderCardTrace order_detail={this.props.order_data.order_detail} />
            case 'oxxo_cash':
                return <OrderOxxoTrace order_detail={this.props.order_data.order_detail} />
            case 'spei':
                return <OrderSpeiTrace order_detail={this.props.order_data.order_detail} />
            default:
                return ""
        }
    }
    
    render(){
        const { order_data_is_available } = this.props
        const { order_data } = this.props
        if (order_data_is_available){
            var { payment_method } = order_data.order_detail
            console.log(order_data.order_detail.payment_method)
        }
        return(
            <div>
                <Title level={1}>Seguimiento de tu Orden</Title>
                {order_data_is_available && payment_method !== undefined ? 
                    <div>
                        {this.switchPaymentMethod(payment_method)}
                        <OrderDetail order_detail={order_data}/>
                    </div>
                :
                "Aun nop"
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        order_data_is_available: state.order.order_detail_available,
        order_data: state.order.order_data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderDetail: (order_id) => dispatch(orderGetDetail(order_id)),
        cartFlush: () => dispatch(cartFlush())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderTracing)
import React, { Component } from "react"
import { connect } from "react-redux"
// import { Button, Container, Divider, Grid, Header, Icon, Segment, Placeholder} from 'semantic-ui-react'
import { Typography, Spin } from 'antd';
import  { orderGetDetail } from "../actions/orderpayment"
import OrderDetail from "./OrderDetail"
import PaymentOptions from "./paymentforms/PaymentOptions"
import conektaHelper from './paymentforms/conektaHelper'
const { Title } = Typography;

class OrderPayment extends Component {
    constructor(props){
        super(props)
        this.state = {
            order_id: null,
          };
    }
    componentDidMount(){
        if (this.props.match) {
            const { order_id } = this.props.match.params;
            this.props.getOrderDetail(order_id)
            this.setState({
                order_id: order_id
            })
        }
    }

    render(){
        const { order_id } = this.props.match.params;
        const { order_data_is_available } = this.props
        const { order_data } = this.props
        console.log(order_data_is_available,order_data)

        let cart_detail  ={}
        let cart_array =[]
        let cart_prices =[]
        let cart_items_sum = 0
        let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'MXN',
        });
        if (order_data_is_available){
            cart_detail  = order_data.cart_detail
            cart_array = Object.keys(cart_detail).map(key =>{return cart_detail[key]})
            cart_prices = cart_array.map(item => item.product_data.price * item.quantity);
            cart_items_sum = cart_prices.reduce((a, b) => a + b, 0);
            console.log(cart_array)
        }

        return(
            <div>
                <Title level={1}>Finaliza tu orden</Title>
                { !order_data_is_available ? 
                <div style={{ margin: 100, textAlign: 'center' }}>
                    <Spin size='large'/>
                </div>
                : 
                <div>
                    <OrderDetail order_detail={order_data}/>
                    <br/>
                    <PaymentOptions order_id={order_id}/>
                </div>
                }
                
                {/* <Container>
                    <Header as="h1" textAlign='center'>Finaliza tu orden</Header>
                    { order_data_is_available ?
                    <div>
                        <OrderDetail order_detail={order_data}/>
                        <br/>
                        <PaymentOptions order_id={order_id}/>
                    </div>
                    : 
                    <div>
                    </div>}
                    </Container> */}
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
        getOrderDetail: (order_id) => dispatch(orderGetDetail(order_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPayment)
import React, { Component } from 'react'
import { Descriptions } from 'antd'

class OrderCardTrace extends Component {

    render(){
        const { order_detail } = this.props
        return(
            <div>
                <Descriptions 
                    title="Detalle de Pago"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    >
                    <Descriptions.Item label="Status de la orden">{order_detail.status_orden}</Descriptions.Item>
                    <Descriptions.Item label="ID de Pago">{order_detail.payment_order_id}</Descriptions.Item>
                    </Descriptions>
                <br/>                                    
            </div>
        )
    }
}

export default OrderCardTrace
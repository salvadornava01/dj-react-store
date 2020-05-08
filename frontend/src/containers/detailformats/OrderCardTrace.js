import React, { Component } from 'react'
// import { Button, Container, Header, Table } from "semantic-ui-react"
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
                {/* <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2' textAlign="center">Detalle de Pago</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                Status de la orden:
                            </Table.Cell>
                            <Table.Cell>
                            {order_detail.status_orden}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                Id de Pago:
                            </Table.Cell>
                            <Table.Cell>
                            {order_detail.payment_order_id}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>     */}
                <br/>                                    
            </div>
        )
    }
}

export default OrderCardTrace
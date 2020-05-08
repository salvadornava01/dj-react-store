import React, { Component } from "react"
import { Container, Header, Table, Button, Icon} from "semantic-ui-react"
import { List, Avatar, Descriptions, Typography } from 'antd';
const { Title } = Typography;


class OrderDetail extends Component {

    render(){
        const { order_detail } = this.props
        const cart_array = Object.keys(order_detail.cart_detail).map(key =>{return order_detail.cart_detail[key]})
        const cart_prices = cart_array.map(item => item.product_data.price * item.quantity);
        const cart_items_sum = cart_prices.reduce((a, b) => a + b, 0);
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        const cart_sum_format = formatter.format(cart_items_sum)
        return(
            <div>
                    <Descriptions 
                        title="Detalle de la Orden"
                        bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >
                        <Descriptions.Item label="Cliente">{order_detail.client_detail.name}</Descriptions.Item>
                        <Descriptions.Item label="Teléfono">{order_detail.client_detail.phone}</Descriptions.Item>
                        <Descriptions.Item label="Correo">{order_detail.client_detail.email}</Descriptions.Item>
                        <Descriptions.Item label="Dirección">
                                {order_detail.adress_detail.calle},&nbsp;
                                {order_detail.adress_detail.colonia},&nbsp;
                                {order_detail.adress_detail.ciudad},&nbsp;
                                {order_detail.adress_detail.estado},&nbsp;
                                CP: {order_detail.adress_detail.cp}&nbsp;
                        </Descriptions.Item>
                        <Descriptions.Item label="Productos" >
                        <List
                            itemLayout="horizontal"
                            dataSource={cart_array}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    avatar={<Avatar src={item.product_data.image_url} />}
                                    title={<div>
                                            {`${item.quantity} x ${item.product_data.title}`}
                                            </div>}
                                    description={`Precio unitario: ${formatter.format(item.product_data.price)}`}
                                    />
                                </List.Item>
                        )}
                        />
                        <br/>
                        Envío: {"Gratis"}
                        <br/>
                        <b>Total: {formatter.format(cart_items_sum)} </b>
                        </Descriptions.Item>
                    </Descriptions>
                {/* <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2' textAlign="center">Datos de envío</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                Cliente:
                            </Table.Cell>
                            <Table.Cell>
                            {order_detail.client_detail.name} <br/>
                            {order_detail.client_detail.phone} <br/>
                            {order_detail.client_detail.email}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                Dirección:
                            </Table.Cell>
                            <Table.Cell>
                            {order_detail.adress_detail.calle} <br/>
                            {order_detail.adress_detail.colonia} <br/>
                            {order_detail.adress_detail.ciudad} <br/>
                            {order_detail.adress_detail.estado} <br/>
                            {order_detail.adress_detail.cp} <br/>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <br/>
                <Table unstackable>
                    <Table.Header>
                        <Table.HeaderCell singleLine textAlign="center">Producto</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Cantidad</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Precio Unitario</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Subtotal</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {products_array.map((product, index) => {
                            return(
                                <Table.Row key={index}>
                                    <Table.Cell textAlign="center">
                                        {product.product_data.title}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        {product.quantity}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        {formatter.format(product.product_data.price)}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        {formatter.format(product.product_data.price * product.quantity)}
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell textAlign="center">Total: </Table.HeaderCell>
                                <Table.HeaderCell colSpan='2' />
                                <Table.HeaderCell textAlign="center">
                                    {cart_sum_format}
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>

                </Table>
                 */}
            </div>
        )
    }
}

export default OrderDetail
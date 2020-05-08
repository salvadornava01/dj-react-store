import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchCart, cartDeleteItem } from "../actions/cart";
// import { Button, Container, Header, Table } from "semantic-ui-react";
import { List, Avatar, Button, Tooltip, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import CheckoutProductDetail from "./CheckoutProductDetail";
const { Title } = Typography;

class CheckoutSummary extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      item_clicked: null
    }
  }
  
  static propTypes = {
    cart_items: PropTypes.object.isRequired,
    cart_loading: PropTypes.bool.isRequired,
    fetchCart: PropTypes.func.isRequired,
    cartDeleteItem: PropTypes.func.isRequired
  };


  handleAddToCartButton = product_id => {
    this.setState({
      item_clicked: product_id
    })
    this.props.fetchCart(product_id);
  };

  handleDeleteCartItem = product_id => {
    this.props.cartDeleteItem(product_id);
  }

  render() {

    const { cart_items } = this.props
    const cart_array = Object.keys(cart_items).map(key =>{return cart_items[key]})
    const cart_prices = cart_array.map(item => item.product_data.price * item.quantity);
    const cart_items_sum = cart_prices.reduce((a, b) => a + b, 0);
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MXN',
    });

    return (
      <div>
        <h1>Productos en mi Carrito</h1>
          <List
            itemLayout="horizontal"
            dataSource={cart_array}
            renderItem={item => (
              <List.Item actions={
                    [
                      <Tooltip title="Agregar 1" key="add-item">
                        <Button type="primary" shape="circle" size="small" loading={this.props.cart_loading && this.state.item_clicked == item.product_id} onClick={()=> this.handleAddToCartButton(item.product_id)} icon={<PlusOutlined /> } />
                      </Tooltip>, 
                      <Tooltip title="Quitar 1" key="remove-item">
                        <Button type="primary" shape="circle" size="small" onClick={() => this.handleDeleteCartItem(item.product_id)} icon={<MinusOutlined />} />
                      </Tooltip>, 
                      <a key="list-loadmore-more">Eliminar</a>
                      ]
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.product_data.image_url} />}
                      title={<div>
                              {`${item.product_data.title}`}  <br/>
                              {`Cant: ${item.quantity}`}
                            </div>}
                      description={`Precio unitario: ${formatter.format(item.product_data.price)}`}
                    />
              </List.Item>
          )}
          />
          <div style={{textAlign:'center'}}>
            <Title level={4}>Subtotal: {formatter.format(cart_items_sum)}</Title>
            <Button  htmlType="button" style={{ margin: '0 8px' }} onClick={() => this.props.history.push("/productos")}>
              Seguir comprando
            </Button>
            <Button htmlType="button" type="primary" style={{ margin: '0 8px' }} onClick={() => this.props.history.push("/checkout-order")}>
              Finalizar compra
            </Button>
          </div>
          {/* <h1>Productos en mi Carrito</h1>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine textAlign="center">
                  Producto
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Cantidad</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Precio Unitario
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {cart_array.map((productItem, index) => {
                return <CheckoutProductDetail productItem={productItem} cart_index={index} />;
              })}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Header as="h3" textAlign="center">
                    TOTAL: {formatter.format(cart_items_sum)} <br></br>
                  </Header>
                  <Header as="h3" textAlign="center">
                    <Link 
                    to={{
                    pathname: "/checkout-order",
                    state: { fromDashboard: false }
                    }}>
                      <Button positive icon='check' content=' Completar Pedido' />
                    </Link>
                  </Header>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart_items: state.cart.cart_data,
  cart_loading: state.cart.loading
});

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: product_id => dispatch(fetchCart(product_id)),
    cartDeleteItem: cart_index => dispatch(cartDeleteItem(cart_index)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutSummary));

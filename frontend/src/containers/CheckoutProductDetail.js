import React, { Component } from "react";
import {
  Button,
  Icon,
  Header,
  Table
} from "semantic-ui-react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchCart } from "../actions/cart";
import { cartDeleteItem } from "../actions/cart";

class CheckoutProductDetail extends Component {
  
  constructor(props){
    super(props)
    this.state = {cart_isloading: false }
  }

  handleDeleteCartItem(product_id) {
    this.props.cartDeleteItem(product_id);
  }

  componentWillReceiveProps() {
    if (this.props.cart_loading) {
      this.setState({
        cart_isloading: false
      });
    }
  }

  handleAddToCartButton = product_id => {
    this.props.fetchCart(product_id);
    this.setState({
      cart_isloading:true
    })
  };

  render() {
    const { productItem } = this.props;
    const { cart_loading } = this.props;
    const { cart_index } = this.props;
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MXN',
    });
    return (
      <Table.Row>
        <Table.Cell textAlign="center">
          <img src={productItem.product_data.image_url} width={100} />
          <Header as="h4" textAlign="center">
            {productItem.product_data.title}
          </Header>
        </Table.Cell>
        <Table.Cell textAlign="center">
          Cantidad: {productItem.quantity} <br/>
          {this.state.cart_isloading ? 
          <Button.Group icon>
            <Button disabled>
              <Icon name='plus' />
            </Button>
            <Button disabled>
              <Icon name='minus' />
            </Button>
          </Button.Group>
          : 
          <Button.Group icon>
            <Button onClick={() => this.handleAddToCartButton(productItem.product_id)}>
              <Icon name='plus' />
            </Button>
            <Button onClick={() => this.handleDeleteCartItem(productItem.product_id)}>
              <Icon name='minus' />
            </Button>
          </Button.Group>
          }
        </Table.Cell>
        <Table.Cell>
          <Header as="h2" textAlign="center">
            {formatter.format(productItem.product_data.price)} <br></br>
          </Header>
        </Table.Cell>
      </Table.Row>
    );
  }
}

const mapStateToProps = state => ({
  cart_loading: state.cart.loading
});

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: product_id => dispatch(fetchCart(product_id)),
    cartDeleteItem: cart_index => dispatch(cartDeleteItem(cart_index)),
    fetchCart: product_id => dispatch(fetchCart(product_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutProductDetail);

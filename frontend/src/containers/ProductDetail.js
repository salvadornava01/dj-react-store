import React, { Component } from "react";
import { Card, Tag } from 'antd';
const { Meta } = Card;
import { withRouter } from "react-router-dom"

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchCart } from "../actions/cart";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    this.state = {
      productItem: product,
      cart_loading: false
    };
  }

  handleAddToCartButton = product_id => {
    this.props.fetchCart(product_id);
    this.setState({
      cart_loading: true
    });
  };

  componentWillReceiveProps() {
    if (this.props.add_cart_loading) {
      this.setState({
        cart_loading: false
      });
    }
  }

  render() {
    const productItem = this.props.product;
    const { cart_loading } = this.state;
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MXN',
    });
    return (
      <div>
        <Card
          hoverable
          bordered={false}
          onClick={()=> this.props.history.push(`/productos/${productItem.id}`)}
          // cover={<img alt="example" src={productItem.image_url} style={{maxHeight:'300px',width:'auto', maxWidth: "100%", marginLeft:'auto', marginRight:'auto'}} />}
          cover = {<div style={{width:'auto', height:'350px', backgroundSize:'contain', backgroundPosition:'center center', backgroundRepeat:'no-repeat', backgroundImage:`url(${productItem.image_url})`}}></div>}
        >
          <Meta title={productItem.title} 
            description={
              <div>
                Precio: {formatter.format(productItem.price) } 
                {productItem.available ? (
                    <Tag color="success">disponible</Tag>
                  ) : (
                    <Tag color="error">agotado</Tag>
                  )}
              </div>
            } />
        </Card>
        {/* {productItem !== null ? (
          <Item.Group divided>
            <Item>
              <Item.Image src={productItem.image_url} />

              <Item.Content>
                <Item.Header>
                  <Link
                    to={{
                      pathname: `/productos/${productItem.id}`,
                      state: { fromDashboard: false }
                    }}
                  >
                    {productItem.title}
                  </Link>
                </Item.Header>
                <Item.Meta>
                  <span className="cinema">{productItem.category}</span>
                </Item.Meta>
                <Item.Meta>
                  <span>{`Precio: ${formatter.format(productItem.price)}`}</span>
                </Item.Meta>
                <Item.Description>{productItem.description}</Item.Description>
                <Item.Extra>
                  {productItem.available ? (
                    <Label color="green">Disponible</Label>
                  ) : (
                    <Label color="red">Agotado</Label>
                  )}
                </Item.Extra>
                <Item.Extra>
                  {productItem.available ? (
                    <Button
                      primary
                      floated="right"
                      icon
                      labelPosition="right"
                      onClick={() => this.handleAddToCartButton(productItem.id)}
                    >
                      Agregar al carrito
                      {cart_loading ? (
                        <Dimmer active inverted>
                          <Loader size="small"></Loader>
                        </Dimmer>
                      ) : (
                        ""
                      )}
                      <Icon name="cart plus" />
                    </Button>
                  ) : (
                    ""
                  )}
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        ) : (
          ""
        )} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  add_cart_loading: state.cart.loading
});

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: product_id => dispatch(fetchCart(product_id))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));

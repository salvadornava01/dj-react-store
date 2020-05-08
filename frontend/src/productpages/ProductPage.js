import React, { Component } from "react";
import ProductImages from "./ProductImages";
import {
  Label,
  // List,
  Rating,
  Segment
} from "semantic-ui-react";
import { Avatar, Button, Divider, Layout, List, Rate, Spin, Tag, Typography } from 'antd';
import { CreditCardOutlined, CheckOutlined, DollarOutlined } from '@ant-design/icons'
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

import "whatwg-fetch";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProductDetail } from "../actions/products";
import { fetchCart } from "../actions/cart";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productid: null,
      ProductInfoObj: {},
      cart_loading: false
    };
  }

  handleAddToCartButton = product_id => {
    this.props.fetchCart(product_id);
    this.setState({
      cart_loading: true
    });
  };

  componentDidMount() {
    if (this.props.match) {
      const { productid } = this.props.match.params;
      this.props.getProductDetail(productid);
      //Make validation with backend and get the product info object
      this.setState({
        productid: productid
      });
    }
  }
  componentWillReceiveProps() {
    if (this.props.add_cart_loading) {
      this.setState({
        cart_loading: false
      });
    }
  }

  static propTypes = {
    productdetail: PropTypes.object.isRequired
  };

  render() {
    const { productid } = this.state;
    const ProductInfoObj = this.props.productdetail;
    const { cart_loading } = this.state
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MXN',
    });
    const data = [
      {
        title: 'Paga seguro con Tarjeta, Efectivo en Oxxo o Transferencia SPEI',
        avatar: <Avatar style={{ backgroundColor: '#87d068' }} icon={<CreditCardOutlined />} />,
        description: <div >
                      <img src="https://i.ibb.co/VVRX1nv/visa2.png" />
                      <img src="https://i.ibb.co/L5H68Cr/mastercardpay.png" alt="" />
                      <img src="https://i.ibb.co/7WQS04F/amexpay.png" alt="" />
                      <img src="https://i.ibb.co/kXgjm3G/oxxopay.png" alt="" />
                     </div>
      },
      {
        title: 'Envío gratis',
        avatar: <Avatar style={{ backgroundColor: '#87d068' }} icon={<CheckOutlined />} />,
        description: "Te llega gratis a tu domicilio entre 5 y  10 días hábiles"
      },
    ];
    return (
      <div>
        {productid !== null ? (
          <div className="card">
            <div className="card-body">
              {productid === this.props.productdetail.id ? (
                <div className="row">
                  <div className="col-sm-8">
                    <ProductImages image_url={ProductInfoObj.image_url} />
                  </div>
                  <div className="col-sm-4">
                    <Divider />
                      <Title level={2}>{ProductInfoObj.title} </Title>
                      <Title level={3}>{formatter.format(ProductInfoObj.price)}</Title>
                      <Rate allowHalf defaultValue={4.5} />
                    <List
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={item.avatar}
                            title={item.title}
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                    {/* <List divided relaxed>
                      <List.Item>
                        
                          {ProductInfoObj.title}
                        
                      </List.Item>
                      <Rating
                        maxRating={5}
                        defaultRating={4}
                        icon="star"
                        size="small"
                        disabled
                      />
                      {formatter.format(ProductInfoObj.price)}
                      <List.Item>
                        <p>{ProductInfoObj.description}</p>
                      </List.Item>
                      <List.Item>
                        <List.Icon
                          name="dollar"
                          size="large"
                          verticalAlign="middle"
                        />
                        <List.Content>
                          <List.Header>Métodos de pago</List.Header>
                          <List.Description>
                            Paga con Tarjeta, efectivo en Oxxo o Transferencia
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon
                          name="shipping fast"
                          size="large"
                          verticalAlign="middle"
                        />
                        <List.Content>
                          <List.Header>Envíos a todo México</List.Header>
                          <List.Description>
                            $60 envío. Envío gratis en pedidos mayores a $300{" "}
                          </List.Description>
                        </List.Content>
                        <Segment
                          vertical
                          style={{ margin: "1em 0em 0em", padding: "1em 0em" }}
                        />
                      </List.Item>
                      {ProductInfoObj.available ? (
                        <div>
                            <Button type="primary"
                            loading = {cart_loading}
                              onClick={() =>
                                this.handleAddToCartButton(ProductInfoObj.id)
                              }
                            >
                              Agregar al carrito
                            </Button>
                        </div>
                      ) : (
                        <Label color="red">Agotado</Label>
                      )}
                    </List> */}
                    <Divider />
                    {ProductInfoObj.available ? (
                        <p style={{textAlign:'center'}}>
                            <Button type="primary"
                            loading = {cart_loading}
                              onClick={() =>
                                this.handleAddToCartButton(ProductInfoObj.id)
                              }
                            >
                              Agregar al carrito
                            </Button>
                        </p>
                      ) : (
                        <Tag color="red">Agotado</Tag>
                      )}
                  </div>
                  <Divider />
                </div>
              ) : (
                <div style={{ margin: 100, textAlign: 'center' }}>
                  <Spin size='large'/>
                </div>
              )}
            </div>
          </div>
        ) : (
          "No encontrado"
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productdetail: state.products.product_detail,
  add_cart_loading: state.cart.loading
});

export default connect(mapStateToProps, { getProductDetail, fetchCart })(
  ProductPage
);
//export default connect(mapStateToProps, { getProducts })(ProductListCard);

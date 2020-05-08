import React, { Component } from "react";
import ProductDetail from "./ProductDetail";
import ProductLoading from "./ProductDetailLoading";
import { Grid } from "semantic-ui-react";
import { Row, Col, Layout, Typography } from 'antd';
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

import "whatwg-fetch";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducts } from "../actions/products";

class ProductListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productlist: null
    };
  }

  loadProducts() {
    const endpoint = "http://127.0.0.1:8000/";
    let actual_obj = this;
    let lookupOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(endpoint, lookupOptions)
      .then(function(response) {
        return response.json();
      })
      .then(function(responseData) {
        // console.log(responseData)
        actual_obj.setState({
          productlist: responseData
        });
      })
      .catch(function(error) {
        console.log("error", error);
      });
  }

  componentDidMount() {
    this.props.getProducts();
  }
  static propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
  };

  render() {
    const productlist = this.props.products;
    return (
        <div >
        <Title level={2} >Productos :3 </Title>
        {/* <Grid container stackable columns={3}>
          {productlist.length !== 0 ? (
            productlist.map((item, index) => {
              return (
                <Grid.Column key={index}>
                  <ProductDetail
                    product={item}
                    key={`product-list-key ${item.id}`}
                  />
                </Grid.Column>
              );
            })
          ) : (
            <div>
              <Grid container stackable columns={3}>
                <Grid.Column>
                  <ProductLoading />
                </Grid.Column>
                <Grid.Column>
                  <ProductLoading />
                </Grid.Column>
                <Grid.Column>
                  <ProductLoading />
                </Grid.Column>
                <Grid.Column>
                  <ProductLoading />
                </Grid.Column>
              </Grid>
            </div>
          )}
        </Grid> */}
        <Row justify="left" gutter={[16, 24]}>
          {productlist.map((item, index) => {
              return (
                <Col xs={24} sm={12}  md={8} xl={6} key={`product-${index}`}>
                  <ProductDetail
                    product={item}
                    key={`product-list-key ${item.id}`}
                  />
                </Col>
              );
            })}
        </Row>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products
});

export default connect(mapStateToProps, { getProducts })(ProductListCard);

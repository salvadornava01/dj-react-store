import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Icon,
  Placeholder,
  Item,
  Label
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    this.state = {
      productItem: product
    };
  }
  // componentDidMount(){
  //     const {product} = this.props
  //     console.log(product)
  //     this.setState({
  //         productItem: product
  //     })
  // }

  render() {
    const { productItem } = this.state;
    return (
      <Container>
        {" "}
        <Divider></Divider>
        <Item.Group divided>
          <Item>
            <Placeholder style={{ height: 200, width: 170 }}>
              <Placeholder.Image />
            </Placeholder>
            <Item.Content>
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Item.Content>
          </Item>
        </Item.Group>
      </Container>
    );
  }
}

export default ProductDetail;

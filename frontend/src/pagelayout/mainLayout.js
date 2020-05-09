import React, { Component } from "react";
import NavBar from "./NavBar";
import ProductListCard from "../containers/ProductListCard";
import ProductPage from "../productpages/ProductPage";
import HomePage from "../containers/HomePage";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import CheckoutSummary from "../containers/CheckoutSummary";
import CheckoutOrder from "../containers/CheckoutOrder"
import OrderPayment from "../containers/OrderPayment"
import OrderTracing from "../containers/OrderTracing"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
const { Content } = Layout;
import ScrollToTop from "./scrol_fun";

class MainLayout extends Component {
  render() {
    return (
      <BrowserRouter>
         <ScrollToTop />
        <NavBar />
         {/* <Segment vertical style={{ margin: "5em 0em 0em", padding: "1em 0em" }}> */}
         <Content style={{ padding: '0 15px', marginTop: 64 }}>
           <Switch>
             <Route exact path="/" component={HomePage} />
             <Route exact path="/productos" component={ProductListCard} />
             <Route exact path="/productos/:productid" component={ProductPage} />
             <Route exact path="/login" component={Login} />
             <Route exact path="/signup" component={Signup} />
             <Route exact path="/checkout-summary" component={CheckoutSummary} />
             <Route exact path="/checkout-order" component={CheckoutOrder} />
             <Route exact path="/order/:order_id" component={OrderPayment}/>
             <Route exact path="/order-tracing/:order_id" component={OrderTracing}/>

           </Switch>
        </Content>
         {/* </Segment> */}
      </BrowserRouter>
    );
  }
}

export default MainLayout;

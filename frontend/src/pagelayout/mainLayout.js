import React, { Component, Suspense, lazy } from "react";
import HomePage from "../containers/HomePage";
import NavBar from "./NavBar";
//const NavBar = lazy(() => import('./NavBar'));
//import ProductListCard from "../containers/ProductListCard";
const ProductListCard = lazy(() => import('../containers/ProductListCard'));
//import ProductPage from "../productpages/ProductPage";
const ProductPage = lazy(() => import('../productpages/ProductPage'));
//import Login from "../containers/Login";
const Login = lazy(() => import('../containers/Login'));
//import Signup from "../containers/Signup";
const Signup = lazy(() => import('../containers/Signup'));
//import CheckoutSummary from "../containers/CheckoutSummary";
const CheckoutSummary = lazy(() => import('../containers/CheckoutSummary'));
//import CheckoutOrder from "../containers/CheckoutOrder"
const CheckoutOrder = lazy(() => import('../containers/CheckoutOrder'));
//import OrderPayment from "../containers/OrderPayment"
const OrderPayment = lazy(() => import('../containers/OrderPayment'));
//import OrderTracing from "../containers/OrderTracing"
const OrderTracing = lazy(() => import('../containers/OrderTracing'));

const AccountPanel = lazy(() => import('../accounts/AccountPanel'));

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
const { Content } = Layout;
import ScrollToTop from "./scrol_fun";

const LoadingScreen = <div id="loading-page" style={{paddingTop: "30%"}}>
                        <div className="ant-space-item">
                            <div className="ant-spin ant-spin-lg ant-spin-spinning" style={{paddingTop: "30%", marginLeft: "auto", marginRight: "auto", display:"block"}}>
                                <span className="ant-spin-dot ant-spin-dot-spin"><i className="ant-spin-dot-item"></i><i className="ant-spin-dot-item"></i><i className="ant-spin-dot-item"></i><i className="ant-spin-dot-item"></i></span>
                            </div>
                        </div>
                      </div>;

class MainLayout extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop />

          <NavBar />

        <Suspense fallback={LoadingScreen}>
          <Content style={{ padding: '0 15px', paddingTop: 64 }}>
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
              <Route exact path="/account/" component={AccountPanel}/>

            </Switch>
            </Content>
          </Suspense>
      </BrowserRouter>
    );
  }
}

export default MainLayout;

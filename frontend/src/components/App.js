import React, { Component, Suspense, lazy  } from 'react'
const MainLayout = lazy(() => import('../pagelayout/mainLayout'));

import { connect } from "react-redux";
import { authCheckState, authCheckAnonCart } from "../actions/auth";
import { cartCheckState } from "../actions/cart";

const LoadingScreen = <div id="loading-page" style={{paddingTop: "30%"}}>
                        <div className="ant-space-item">
                            <div className="ant-spin ant-spin-lg ant-spin-spinning" style={{paddingTop: "30%", marginLeft: "auto", marginRight: "auto", display:"block"}}>
                                <span className="ant-spin-dot ant-spin-dot-spin"><i className="ant-spin-dot-item"></i><i className="ant-spin-dot-item"></i><i className="ant-spin-dot-item"></i><i className="ant-spin-dot-item"></i></span>
                            </div>
                        </div>
                      </div>

class App extends Component {
    componentDidMount() {
        this.props.authCheckState();
        this.props.authCheckAnonCart();
        this.props.cartCheckState();
    }
    render(){
        return <Suspense fallback={LoadingScreen}><MainLayout /></Suspense>
    }
}

export default connect(null, { authCheckState, authCheckAnonCart, cartCheckState })(App);

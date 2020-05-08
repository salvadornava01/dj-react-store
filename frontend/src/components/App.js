import React, { Component } from 'react'
import MainLayout from "../pagelayout/mainLayout";

import { connect } from "react-redux";
import { authCheckState, authCheckAnonCart } from "../actions/auth";
import { cartCheckState } from "../actions/cart";

class App extends Component {
    componentDidMount() {
        this.props.authCheckState();
        this.props.authCheckAnonCart();
        this.props.cartCheckState();
    }
    render(){
        return <MainLayout />
    }
}

export default connect(null, { authCheckState, authCheckAnonCart, cartCheckState })(App);

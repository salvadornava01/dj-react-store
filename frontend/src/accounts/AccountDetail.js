import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Divider} from "antd"
import axios from "axios";
import cookie from "react-cookies"

class AccountDetail extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const thisComp = this
        const { user_token } = this.props
        console.log(user_token)
        const endpoint = "/api/clients/account-data/"
        axios.get(endpoint, {
            params: {
                token: user_token
            }
        })
        .then(function(response){
            return response
        })
        .then(function(responseData) {
            console.log(responseData.data)
        })
        .catch(function(error) {
            console.log("An error ocurred", error)
        })
    }

    render(){
        return(
            <div>
                <Divider>Datos de contacto</Divider>
                <Divider>Direcciones Guardadas</Divider>
                <Divider>Historial de órdenes</Divider>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_token: state.auth.token,
    }
}

export default withRouter(connect(mapStateToProps, null)(AccountDetail))
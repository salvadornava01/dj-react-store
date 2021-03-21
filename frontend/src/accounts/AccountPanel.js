import React, { Component } from "react"
import AccountDetail from "./AccountDetail"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Typography } from "antd"
const { Title } = Typography;

function AccountPanel(props){
    const { isAuthenticated } = props
    return(
            <div>
                { isAuthenticated ? 
                    <div>
                        <Title level={3} style={{textAlign:"center"}}>Tu cuenta</Title>
                        <AccountDetail />
                    </div>
                :
                    "Please Login"
                }
            </div>  
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default withRouter(connect(mapStateToProps, null)(AccountPanel))
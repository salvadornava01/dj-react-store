import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

function AccountPanel(props){
    const { isAuthenticated } = props
    return(
            <div>
                { isAuthenticated ? 
                    "Hello Account Panel"
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
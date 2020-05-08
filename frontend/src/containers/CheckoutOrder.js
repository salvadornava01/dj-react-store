import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { Container, Grid, Header, Icon} from 'semantic-ui-react'
import { Alert, Button, Divider, Spin } from 'antd'
import { FacebookOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import Login from "../containers/Login";
import ClientDataForm from "../containers/ClientDataForm"
import { authAnonymousCart, authStartAnonCart, authGetClientData } from "../actions/auth";

class CheckoutOrder extends Component{

    constructor(props){
        super(props)
        this.props.authGetClientData()
    }

    handleAnonymousCart(){
        this.props.startAnonymousCart()
    }

    componentDidMount(){
        this.props.authGetClientData()
    }

    render(){

        const { isAuthenticated } = this.props 
        const { anonymous_order } = this.props
        const { getting_client_data } = this.props
        const { client_data_error } = this.props
        return(
            <div>
                {isAuthenticated ? 
                <div>
                    { getting_client_data ? 
                            <div style={{ margin: 100, textAlign: 'center' }}>
                                <Spin size='large'/>
                            </div>
                        :
                            <div>
                                { client_data_error !== null ?
                                    <div>
                                        <Alert
                                            message={client_data_error.message}
                                            banner
                                        />
                                        <div style={{textAlign:'center', marginTop:40}}>
                                            <Button type="primary" htmlType="submit" loading={false} onClick={()=> console.log('Go Account')}>
                                                Ir a mi cuenta
                                            </Button>
                                        </div>
                                    </div> 
                                :
                                    <ClientDataForm client_data={this.props.client_data}/>
                                }
                            </div>
                    }
                </div> 
                : 
                    <div>
                        { anonymous_order ? 
                            <ClientDataForm client_data={null}/>
                        : 
                        <div style={{maxWidth:450, marginLeft:'auto', marginRight:'auto'}}>
                            <Login />
                            <Divider>O si prefieres</Divider>
                            <div style={{textAlign:'center'}}>
                                <Button type="primary" icon={<FacebookOutlined twoToneColor="#1890FF" /> } block="true"  disabled> Accede con Facebook</Button>
                                <br/><br/>
                                <Button icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} block="true"  onClick={()=>{this.handleAnonymousCart()}}> Continúa sin registro</Button> 
                            </div>
                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

{/* <Header as='h1' textAlign='center'>
                    Completa tu orden
                </Header>

                { !isAuthenticated && !anonymous_order ? 
                <div style={{maxWidth:450, marginLeft:'auto', marginRight:'auto'}}>
                <Login />
                <Divider horizontal>
                    <Header as='h4'>
                        O si prefieres:
                    </Header>
                </Divider>
                <div>
                    <Grid stackable columns={2}>
                        <Grid.Column>
                            <Button color='facebook' fluid disabled><Icon name='facebook' /> Accede con Facebook</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Link 
                            to={{
                                pathname: "/checkout-summary",
                                state: { fromDashboard: false }
                                }}> 
                            </Link>
                            <Button color='green' fluid onClick={()=>{this.handleAnonymousCart()}}> <Icon name='check circle' /> Continúa sin registro</Button>
                        </Grid.Column>

                    </Grid>
                </div>
                </div>
                :
                <div>
                    { isAuthenticated && this.props.client_data_ready  ? <ClientDataForm client_data={this.props.client_data}/> 
                :
                    <div> 
                        { anonymous_order ? <ClientDataForm/>: "Completa los datos de tu perfil"} 
                    </div>} 
                </div>
                } */}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null,
      cart_items: state.cart.cart_data,
      anonymous_order: state.auth.anonymous_order,
      client_data: state.auth.client_data,
      getting_client_data: state.auth.getting_client_data,
      client_data_error: state.auth.error
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      setAnonymousCart: () => dispatch(authAnonymousCart()),
      startAnonymousCart: () => dispatch(authStartAnonCart()),
      authGetClientData: () => dispatch(authGetClientData())
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOrder)
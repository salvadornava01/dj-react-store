import React, { Component } from 'react'
import CardForm from './CardForm'
import OxxoPayForm from './OxxoPayForm'
import SpeiPayForm from './SpeiPayForm'
// import { Button, Container, Divider, Grid, Header, Icon, Segment} from 'semantic-ui-react'
import conektaHelper from './conektaHelper'


import { Tabs } from 'antd';
import { CreditCardOutlined , DollarOutlined, BankOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

class PaymentOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            payment_selected: "card"
        }
        this.handlePaymentSelect = this.handlePaymentSelect.bind(this)
    }

    componentDidMount () {
        const script = document.createElement('script')
        script.src = 'https://cdn.conekta.io/js/latest/conekta.js'
        script.async = true
        document.body.appendChild(script)
    }

    handlePaymentSelect(actual_payment_selected){
        this.setState({
            payment_selected: actual_payment_selected
        })
    }

    switchPaymentMethod(method) {
        switch(method) {
            case 'card':
                return <CardForm order_id={this.props.order_id} />
            case 'efectivo':
                return <OxxoPayForm order_id={this.props.order_id}/>
            case 'spei':
                return <SpeiPayForm order_id={this.props.order_id}/>
            default:
                return ""
        }
    }
    
    render(){
        let { payment_selected } = this.state 
        return(
            <div>
                <p>Selecciona tu método de pago:</p>
                <Tabs defaultActiveKey="card">
                    <TabPane
                    tab={
                        <span>
                            <CreditCardOutlined />
                            Tarjeta
                        </span>
                    }
                    key="card"
                    >
                        <CardForm order_id={this.props.order_id} />
                    </TabPane>
                    <TabPane
                    tab={
                        <span>
                            <DollarOutlined />
                            Efectivo
                        </span>
                    }
                    key="cash"
                    >
                        <OxxoPayForm order_id={this.props.order_id}/>
                    </TabPane>
                    <TabPane
                    tab={
                        <span>
                            <BankOutlined />
                            Transferencia
                        </span>
                    }
                    key="transfer"
                    >
                        <SpeiPayForm order_id={this.props.order_id}/>
                    </TabPane>
                </Tabs>
                {/* <Button.Group attached='top' color='blue'>
                    <Button icon='cc mastercard' content='Tarjeta' onClick={() => this.handlePaymentSelect('card')} />
                    <Button icon='money bill alternate outline' content='Efectivo' onClick={() => this.handlePaymentSelect('efectivo')}/>
                    <Button icon='dollar' content='SPEI' onClick={() => this.handlePaymentSelect('spei')}/>
                </Button.Group>
                <Segment attached>
                    {this.switchPaymentMethod(payment_selected)}
                </Segment> */}
            </div>
        )
    }
}

export default PaymentOptions
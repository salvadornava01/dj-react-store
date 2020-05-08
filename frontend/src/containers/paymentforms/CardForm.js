import React, { Component } from 'react'
import { connect } from "react-redux"
// import { Input, Button, Form, Message, Progress } from 'semantic-ui-react'
import {
    Alert,
    Form,
    Input,
    Button,
    Select,
    Progress,
    Result,
    Tooltip 
  } from 'antd';
import { UserOutlined, CreditCardOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import conektaHelper from './conektaHelper'
import { orderPaymentPostDetail } from "../../actions/orderpayment"
import { withRouter } from "react-router-dom"



class CardForm extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
        this.state = {
            card_error: false,
            error_msg: "",
            percent: 50
        }
        console.log(this.props)
    }
    conektaSuccessResponseHandler = token => {
        console.log("success")
        const { order_id } = this.props
        this.props.orderPaymentPostDetail(order_id, 'card', token.id)
        // this.props.orderPaymentPostDetail(order_id, 'card', 'tok_2nY9MxHPRYRV7Amqx')
      };
    
    conektaErrorResponseHandler = response => {
        console.log("error")
        this.setState({
            card_error: true,
            error_msg: response.message_to_purchaser
        })
      };

    handleFormChange(event){
        this.setState({
            card_error:false
        })
    }
    handleSubmit(values){ 
        conektaHelper.initConekta()
        //cardNumber, cardHolder, expiryMonth, expiryYear, cvc, successCallback, errorCallback
        //4242424242424242, "Salvador Nava", 06, 2021, 123 
        conektaHelper.tokenize(
            values.card_number, 
            values.name, 
            values.month, 
            values.year,
            values.cvc, 
            this.conektaSuccessResponseHandler, 
            this.conektaErrorResponseHandler)
    }

    handleFormFinish = (values) => {
        // console.log(values)
        this.handleSubmit(values)
      }

    handleRedirect(order_id){
        console.log(this.props)
        this.props.history.push(`/order-tracing/${order_id}`);
    }

    componentDidMount(){
        console.log("ki mounted")
    }

    render(){
        const { card_error } = this.state
        const { error_msg } = this.state
        const { order_id } = this.props
        return(
            <div style={{textAlign: "center", maxWidth: "400px", marginRight:"auto", marginLeft:"auto"}}>
                <br/>
                {this.props.order_ispaid == "paid" || this.props.order_ispaid == "pending_payment" ? 
                    <div style={{marginTop: "20px", marginBottom:"20px"}}>
                        Esta orden se encuentra pagada o pendiente de pago.
                        <div style={{marginBottom:"40px"}}>
                            🎉🎊🥳
                        </div>
                        <p>Da click en continuar para ver los detalles de tu compra:</p>
                        <Button color="green" onClick={() => this.handleRedirect(order_id)}>Continuar</Button>
                    </div> 
                : ""}
                {this.props.payment_progress > 0 && !this.props.payment_succeeded && !this.props.payment_error ? 
                    <div>
                        <Progress percent={this.props.payment_progress} status="active" />
                        Procesando Pago
                    </div>
                : ""}
                {this.props.payment_succeeded && this.props.method_selected == "card"  ? 
                    <div>
                        <Progress percent={100}  />
                        <Result
                            status="success"
                            title="Tu pago ha sido exitoso!"
                            subTitle={`Id de tu pago: ${this.props.payment_data}. Dentro de los próximos minutos
                                        recibirás un e-mail con la confirmación de tu pago`}
                            extra={[
                            <Button type="primary" key="continuar" onClick={() => this.handleRedirect(order_id)}>
                                Continuar
                            </Button>,
                            ]}
                        />
                    </div>
                : ""}
                {this.props.payment_progress > 0 && this.props.payment_error && this.props.method_selected == "card"  ? 
                    <div>
                        <Progress percent={100} status="exception" />
                        Ha ocurrido un error:  {this.props.error_detail} 
                    </div>
                : ""}
                <br/>
                {(this.props.order_ispaid != "paid" && this.props.order_ispaid != "pending_payment") && !this.props.payment_succeeded ? 
                    <div>
                        {card_error ?
                            <Alert
                            message="Revista los datos"
                            description={error_msg}
                            type="error"
                            /> 
                        : ""}
                        <br/>
                        <p><img src="https://i.ibb.co/jM2BCVf/pay-visa.png" />
                            <img src="https://i.ibb.co/3Mkzn3g/pay-mastercard.png" />
                            <img src="https://i.ibb.co/dDC0rT0/pay-american-ex.png" />
                        </p>
                        <Form
                            layout="vertical"
                            onFinish={this.handleFormFinish}
                            scrollToFirstError
                        >
                            <Form.Item
                            label="Nombre del Tarjetahabiente"
                            name="name"
                            rules={[{ required: true, message: "Introduce el nombre del Tarjetahabiente" }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre" onChange={this.handleFormChange} />
                            </Form.Item>
                            <Form.Item
                            label="Número de la Tarjeta"
                            name="card_number"
                            rules={[{ required: true, message: "Introduce el número de la Tarjeta" }]}
                            >
                                <Input prefix={<CreditCardOutlined className="site-form-item-icon" />} placeholder="Tarjeta" onChange={this.handleFormChange}/>
                            </Form.Item>
                            <Form.Item label="Expiración" style={{ marginBottom: 0 }} required>
                                <Form.Item
                                name="month"
                                rules={[{ required: true, message: "Selecciona el mes" }]}
                                style={{ display: 'inline-block', width: 'calc(33%)',}}
                                >
                                    <Select placeholder="Mes" onChange={this.handleFormChange}>
                                        <Select.Option value="01">01</Select.Option>
                                        <Select.Option value="02">02</Select.Option>
                                        <Select.Option value="03">03</Select.Option>
                                        <Select.Option value="04">04</Select.Option>
                                        <Select.Option value="05">05</Select.Option>
                                        <Select.Option value="06">06</Select.Option>
                                        <Select.Option value="07">07</Select.Option>
                                        <Select.Option value="08">08</Select.Option>
                                        <Select.Option value="09">09</Select.Option>
                                        <Select.Option value="10">10</Select.Option>
                                        <Select.Option value="11">11</Select.Option>
                                        <Select.Option value="12">12</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                name="year"
                                rules={[{ required: true, message: "Selecciona el año"}]}
                                style={{ display: 'inline-block', width: 'calc(33% - 3px)', margin:'0 3px'}}
                                >
                                    <Select placeholder="Año" onChange={this.handleFormChange}>
                                        <Select.Option value="2020">2020</Select.Option>
                                        <Select.Option value="2022">2022</Select.Option>
                                        <Select.Option value="2023">2023</Select.Option>
                                        <Select.Option value="2024">2024</Select.Option>
                                        <Select.Option value="2025">2025</Select.Option>
                                        <Select.Option value="2026">2026</Select.Option>
                                        <Select.Option value="2027">2027</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                name="cvc"
                                rules={[{ required: true, message: "El CVC es requerido" }]}
                                style={{ display: 'inline-block', width: 'calc(33%)',  }}
                                >
                                    <Input placeholder="CVC" onChange={this.handleFormChange}/>
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label=" " colon={false}>
                                <Button type="primary" htmlType="submit" loading={this.props.processing_payment}>
                                Pagar con Tarjeta
                                </Button>
                            </Form.Item>
                        </Form>
                        {/* <Form error onSubmit={this.handleSubmit} loading={this.props.processing_payment}>
                            {card_error ? 
                                <Message
                                    error
                                    header='Revista los datos'
                                    content={error_msg}
                                />  
                            : ""}
                            <Form.Input icon='user' iconPosition='left' fluid label='Nombre del tarjetahabiente' placeholder='Nombre' name="name" onChange={this.handleFormChange}/>
                            <Form.Input icon='credit card' iconPosition='left' fluid label='Número de la Tarjeta' placeholder='' name="card_number" onChange={this.handleFormChange}/>
                            <Form.Group unstackable widths={3}>
                                <Form.Field label='Mes' control='select' name="month" onChange={this.handleFormChange}>
                                    <option value=''>Selecciona</option>
                                    <option value='01'>01</option>
                                    <option value='02'>02</option>
                                    <option value='03'>03</option>
                                    <option value='04'>04</option>
                                    <option value='05'>05</option>
                                    <option value='06'>06</option>
                                    <option value='07'>07</option>
                                    <option value='08'>08</option>
                                    <option value='09'>09</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                </Form.Field>
                                <Form.Field label='Año' control='select' name="year" onChange={this.handleFormChange}>
                                    <option value=''>Selecciona</option>
                                    <option value='2020'>2020</option>
                                    <option value='2021'>2021</option>
                                    <option value='2022'>2022</option>
                                    <option value='2023'>2023</option>
                                    <option value='2024'>2024</option>
                                    <option value='2025'>2025</option>
                                    <option value='2026'>2026</option>
                                </Form.Field>
                                <Form.Input fluid label='CVC' placeholder='CVC' name="cvc" onChange={this.handleFormChange}/>
                            </Form.Group><br/>
                            <Button type='submit' color="green">Pagar con Tarjeta</Button>
                        </Form>  */}
                        <p>
                            <img src="https://i.ibb.co/Fw4j8zZ/conekta-logo.png" width="110px"   />
                            <img src="https://i.ibb.co/cchj1Fd/secure-payment.jpg" width="80px"  />
                        </p>
                    </div>
                :
                ""
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        method_selected: state.order.payment_method,
        order_ispaid: state.order.order_data.order_detail.status_orden,
        processing_payment: state.order.processing_payment,
        payment_succeeded: state.order.payment_succeeded,
        payment_data: state.order.payment_data,
        payment_progress: state.order.payment_progress,
        payment_error: state.order.payment_error,
        error_detail: state.order.errors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderPaymentPostDetail: (order_id, payment_method, token) => dispatch(orderPaymentPostDetail(order_id, payment_method, token))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardForm))
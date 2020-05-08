import React, { Component } from 'react'
import { connect } from "react-redux"
import conektaHelper from './conektaHelper'
import { orderPaymentPostDetail } from "../../actions/orderpayment"
// import { Button, Progress } from 'semantic-ui-react'
import {
    Button,
    Progress,
    Result,
  } from 'antd';
import { withRouter } from "react-router-dom"


class SpeiPayForm extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
        this.state = {
            card_error: false,
            error_msg: "",
            percent: 50
        }
    }

    handleSubmit(event){
        conektaHelper.initConekta()
        const { order_id } = this.props
        event.preventDefault()
        this.props.orderPaymentPostDetail(order_id, 'spei')
    }

    handleRedirect(order_id){
        console.log(this.props)
        this.props.history.push(`/order-tracing/${order_id}`);
    }

    render(){
        const { order_id } = this.props
        return(
            <div style={{textAlign: "center", maxWidth: "400px", marginRight:"auto", marginLeft:"auto"}}>
                {this.props.payment_status == "pending_payment" || this.props.payment_status == "paid" ? 
                    <div style={{marginTop: "20px", marginBottom:"20px"}}>
                    Se ha generado una ficha de pago para esta orden
                    <div style={{marginBottom:"40px"}}>
                        🎉🎊🥳
                    </div>
                    <p>Da click en continuar para imprimir tu ficha:</p>
                    <Button color="green" onClick={() => this.handleRedirect(order_id)}>Continuar</Button>
                </div> 
                :
                ""
                }
                <div> 
                
                {this.props.payment_progress > 0 && !this.props.payment_succeeded && !this.props.payment_error ? 
                    <div>
                        <Progress percent={this.props.payment_progress} status="active" />
                        Procesando tu ficha...
                    </div>
                : ""}
                {this.props.payment_succeeded && this.props.method_selected == "spei" ? 
                <div>
                    <Progress percent={100}  />
                        <Result
                            status="success"
                            title="Tu pago ficha se ha generado con éxito!"
                            subTitle={`Da click en continuar para imprimir tu ficha.
                                        Dentro de los próximos minutos también recibirás un e-mail con tu ficha para pago.`}
                            extra={[
                            <Button type="primary" key="continuar" onClick={() => this.handleRedirect(order_id)}>
                                Continuar
                            </Button>,
                            ]}
                        />
                </div>
                : ""}
                {this.props.payment_progress > 0 && this.props.payment_error && this.props.method_selected == "spei"  ? 
                <div>
                    <Progress percent={100} status="exception" />
                        Ha ocurrido un error:  {this.props.error_detail} 
                </div>
                : ""}
                <br/>
                </div>
                {!this.props.payment_succeeded && (this.props.payment_status !== "pending_payment" && this.props.payment_status !== "paid") ? 
                <div>
                    <br/>
                    <img src="https://i.ibb.co/sgkM2kG/spei-brand.png" />
                    <br/>
                    <div style={{textAlign: "left"}}>
                        <p><strong>Instrucciones: </strong></p>
                        <p>Hacer el pago con Transferencia es muy fácil.</p>
                        <p>Da click al botón <strong>Generar formato transferencia</strong> 
                        para generar una ficha con el monto del pago y la CLABE interbancaria.</p>
                        <p>Realiza una transferencia SPEI al banco <strong>STP</strong> con el monto exacto y la <strong>CLABE</strong> de tu ficha y ¡Listo!</p>
                        <p>Tu pago se confirma automáticamente y tu producto es enviado.</p>
                    </div>
                    <br/>
                    <Button color="green" onClick={this.handleSubmit}>Generar formato transferencia</Button>
                    <p>
                        <img src="https://i.ibb.co/Fw4j8zZ/conekta-logo.png" width="110px"   />
                        <img src="https://i.ibb.co/cchj1Fd/secure-payment.jpg" width="80px"  />
                    </p>
                </div>
                :
                ""
                }
            </div>
            // <div style={{textAlign: "center", maxWidth: "400px", marginRight:"auto", marginLeft:"auto"}}>

            //     <div> <br/>
            //     <img src="https://i.ibb.co/sgkM2kG/spei-brand.png" />
            //     <br/>
            //     {this.props.payment_progress > 0 && !this.props.payment_succeeded && !this.props.payment_error ? 
            //     <div>
            //         <Progress percent={this.props.payment_progress} indicating > Procesando tu ficha... </Progress>
            //     </div>
            //     : ""}
            //     {this.props.payment_succeeded ? 
            //     <div>
            //         <Progress percent={100} indicating>
            //             Tu ficha se ha generado con éxito!
            //         </Progress>
            //     </div>
            //     : ""}
            //     {this.props.payment_progress > 0 && this.props.payment_error  ? 
            //     <div>
            //         <Progress percent={100} indicating error> Ha ocurrido un error: {this.props.error_detail} </Progress>
            //     </div>
            //     : ""}
            //     <br/>
            //     </div>
            //     {!this.props.payment_succeeded ? 
            //     <div>
            //         <div>
            //         </div>
            //         <div style={{textAlign: "left"}}>
            //             <p><strong>Instrucciones: </strong></p>
            //             <p>Hacer el pago con Oxxo Pay es muy fácil.</p>
            //             <p>Da click al botón <strong>Crear formato transferencia</strong> 
            //             para generar una ficha con el monto del pago y la CLABE interbancaria.</p>
            //             <p>Realiza una transferencia SPEI al banco <strong>STP</strong> con el monto exacto y la <strong>CLABE</strong> de tu ficha y ¡Listo!</p>
            //             <p>Tu pago se confirma automáticamente y tu producto es enviado.</p>
            //         </div>
            //         <br/>
            //         <Button type='submit' color="green" onClick={this.handleSubmit}>Generar formato transferencia</Button>
            //         <p>
            //             <img src="https://i.ibb.co/Fw4j8zZ/conekta-logo.png" width="110px"   />
            //             <img src="https://i.ibb.co/cchj1Fd/secure-payment.jpg" width="80px"  />
            //         </p>
            //     </div>
            //     :
            //     <div style={{marginTop: "20px", marginBottom:"20px"}}>
            //         <div style={{marginBottom:"40px"}}>
            //             🎉🎊🥳
            //         </div>
            //         <p>Da click en continuar para imprimir tu ficha:</p>
            //         <Button color="green" onClick={() => this.handleRedirect(order_id)}>Continuar</Button>
            //     </div> 
            //     }
            // </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        payment_status: state.order.order_data.order_detail.status_orden,
        method_selected: state.order.payment_method,
        processing_payment: state.order.processing_payment,
        payment_succeeded: state.order.payment_succeeded,
        payment_progress: state.order.payment_progress,
        payment_error: state.order.payment_error,
        error_detail: state.order.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderPaymentPostDetail: (order_id, payment_method, token) => dispatch(orderPaymentPostDetail(order_id, payment_method, token))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpeiPayForm))

// import React, { Component } from 'react'
// import { Button } from 'semantic-ui-react'


// class SpeiPayForm extends Component {

//     render(){
//         return(
//             <div style={{textAlign: "center", maxWidth: "400px", marginRight:"auto", marginLeft:"auto"}}>

            //     <div> <br/>
            //     <img src="https://i.ibb.co/sgkM2kG/spei-brand.png" />
            //     </div>
            //     <div style={{textAlign: "left"}}>
            //         <p><strong>Instrucciones: </strong></p>
            //         <p>Hacer el pago con Oxxo Pay es muy fácil.</p>
            //         <p>Da click al botón <strong>Crear formato transferencia</strong> 
            //         para generar una ficha con el monto del pago y la CLABE interbancaria.</p>
            //         <p>Realiza una transferencia SPEI al banco <strong>STP</strong> con el monto exacto y la <strong>CLABE</strong> de tu ficha y ¡Listo!</p>
            //         <p>Tu pago se confirma automáticamente y tu producto es enviado.</p>
            //     </div>
            //     <br/>
            //     <Button type='submit' color="green">Generar formato transferencia</Button>
            //     <p>
            //         <img src="https://i.ibb.co/Fw4j8zZ/conekta-logo.png" width="110px"   />
            //         <img src="https://i.ibb.co/cchj1Fd/secure-payment.jpg" width="80px"  />
            //     </p>
            // </div>
//         )
//     }
// }

// export default SpeiPayForm
import React, { Component } from 'react'
import { Alert, Badge, Card, Typography } from 'antd';
const { Title } = Typography;

class OrderOxxoTrace extends Component {

    render(){
        const { order_detail } = this.props
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MXN',
        });
        return(
            <div style={{maxWidth:'450px', marginRight:'auto', marginLeft:'auto'}}>
                <Card title="Ficha Digital. No es necesario imprimir" style={{ maxWidth: 450 }}>
                    <div style={{textAlign:'center'}}>
                        <img src="https://i.ibb.co/SQ3qMDf/oxxopay-brand.png" width="150px" alt="OXXOPay"  />
                        <br/><br/>
                        <p><b>Total a pagar:</b></p>
                        <Title level={3}>{formatter.format(order_detail.total_amount)}</Title>
                        <p><b>Referencia:</b></p>
                        <Title level={4}>{order_detail.oxxo_ref}</Title>
                        <br/>
                        <Card
                            type="inner"
                            title="Instrucciones"
                            size="small"  
                            style={{ maxWidth: "100%", marginRight:'auto', marginLeft:'auto' }}
                        >
                            <div style={{textAlign:'left'}}>
                                <ol>
                                    <li>Acude a tu tienda Oxxo más cercana</li>
                                    <li>Indica en caja que quieres realizar un pago de OXXOPay</li>
                                    <li>Dicta al cajero el número de referencia en esta ficha para que tecleé directamete en la pantalla de venta.</li>
                                    <li>Realiza el pago correspondiente con dinero en efectivo.</li>
                                    <li>Al confirmar tu pago, el cajero te entregará un comprobante impreso. <strong>En él podrás verificar que se haya realizado correctamente</strong>. Conserva este comprobante de pago.</li>
                                </ol>
                            </div>
                            <Alert message="Al completar estos pasos recibirás un correo electrónico confirmando tu pago y tu pedido se enviará automáticamente." type="success" />
                        </Card>
                        <br/>
                        <p>Status de la orden:  </p>
                            {order_detail.status_orden == "pending_payment" ? 
                                <Badge status="processing" text="Pendiente de pago" />
                            :
                                <Badge status="success" text="Pagada" />
                            }
                    </div>
                </Card>
                {/* <Segment textAlign='center'>
                Ficha Digital. No es necesario imprimir
                <br/><br/>
                    <Image src="https://i.ibb.co/SQ3qMDf/oxxopay-brand.png" alt="OXXOPay" size='small' centered />
                    <Header as='h2'>{formatter.format(order_detail.total_amount)}</Header>
                    <Header as='h3' block>
                    REF: {order_detail.oxxo_ref}
                    </Header>
                    
                    <Segment color='blue'>
                        Instrucciones:
                        <span style={{textAlign:'left'}}>
                        <List as='ol' textAlign='left'>
                            <List.Item as='li'>Acude a tu tienda Oxxo más cercana</List.Item>
                            <List.Item as='li'>Indica en caja que quieres realizar un pago de OXXOPay</List.Item>
                            <List.Item as='li'>Dicta al cajero el número de referencia en esta ficha para que tecleé directamete en la pantalla de venta.</List.Item>
                            <List.Item as='li'>Realiza el pago correspondiente con dinero en efectivo.</List.Item>
                            <List.Item as='li'>Al confirmar tu pago, el cajero te entregará un comprobante impreso. <strong>En él podrás verificar que se haya realizado correctamente</strong>. Conserva este comprobante de pago.</List.Item>
                        </List>
                        <Segment color='green'>
                        Al completar estos pasos recibirás un correo electrónico confirmando tu pago y tu pedido se enviará automáticamente.
                        </Segment>
                        </span>
                    </Segment>
                <p><strong>Status de la orden:</strong> {order_detail.status_orden}</p>
                </Segment> */}
                <br/>                                    
            </div>
        )
    }
}

export default OrderOxxoTrace
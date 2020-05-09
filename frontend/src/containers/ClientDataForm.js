import React, { Component } from "react"
import {
    Form,
    Input,
    Button,
    Select,
  } from 'antd';
import { withRouter } from "react-router-dom"
import axios from "axios"
import cookie from "react-cookies"


class ClientDataForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            submitloading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(client_data){
        const thisComp = this
        thisComp.setState({
            submitloading: true
        })
        let cart_data = JSON.parse(localStorage.getItem("cart_items"));
        const endpoint = "/api/clients/create-order/";
        const token = localStorage.getItem("token"); //authToken
        let data = {}
        if (token === null){
            data = {
                cart_data: cart_data,
                client_data: client_data,
                };
        } else {
            data = {
                cart_data: cart_data,
                client_data: client_data,
                token: token
                };
        }
        
        let csrfToken = cookie.load('csrftoken') 
        let axiosConfig  = {
        headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
        }
        }

        axios
        .post(endpoint, data, axiosConfig)
        .then(function(response){
            return response
        })
        .then(function(responseData) {
            let order_id = responseData.data.order_id
            thisComp.setState({
                submitloading: false
            })
            thisComp.props.history.push(`/order/${order_id}`);
        })
        .catch(function(error) {
            console.log("An error ocurred", error);
            thisComp.setState({
                submitloading: false
            })
        })
    }

    handleFormFinish = (values) => {
        console.log(values)
        this.handleSubmit(values)
      }

    componentDidMount(){
        const { client_data } = this.props
        if (client_data !== null){
            this.onFill(client_data)
        }
    }

    onFill = (client_data) => {
        this.formRef.current.setFieldsValue({
            nombrecomp: client_data.client_data.name,
            email: client_data.client_data.email,
            telefono: client_data.client_data.phone,
            calle: client_data.address_data.calle,
            colonia: client_data.address_data.colonia,
            ciudad: client_data.address_data.ciudad,
            estado: client_data.address_data.estado,
            cp: client_data.address_data.cp,
        });
      };

    render(){

    return (
        <div>
            <Form
                layout="vertical"
                onFinish={this.handleFormFinish}
                scrollToFirstError
                ref={this.formRef}
                // size={componentSize}
            >
                <Form.Item 
                label="Nombre Completo" 
                name="nombrecomp"
                rules={[
                    {
                      type: 'string',
                      message: 'No es un nombre válido',
                    },
                    {
                      required: true,
                      message: 'Por favor ingresa tu nombre',
                    },
                    {
                      pattern: /^[ÁÉÍÓÚáéíóúñÑüÜÀÈÌÒÙàèìòù.A-Za-z\s]+$/,
                      message: 'Sólo se permiten letras en este campo'
                    },
                  ]}
                >
                <Input />
                </Form.Item>
                <Form.Item 
                label="Correo Electrónico" 
                name="email"
                rules={[
                    {
                      type: 'email',
                      message: 'Por favor ingresa un e-mail válido',
                    },
                    {
                      required: true,
                      message: 'Por favor ingresa tu e-mail',
                    },
                  ]}
                >
                <Input />
                </Form.Item>
                <Form.Item 
                label="Número de Teléfono" 
                name="telefono"
                rules={[
                    {
                      type: 'string',
                      message: 'No es un número válido',
                    },
                    {
                      required: true,
                      message: 'Por favor ingresa tu número a 10 dígitos',
                    },
                    {
                      pattern: /^\d\d\d\d\d\d\d\d\d\d$/,
                      message: 'Por favor ingresa tu número a 10 dígitos. Sólo se permiten números en este campo'
                    },
                  ]}
                >
                <Input />
                </Form.Item>
                <Form.Item 
                label="Calle y Número" 
                name="calle"
                rules={[
                    {
                      type: 'string',
                      message: 'No es una dirección válida',
                    },
                    {
                      required: true,
                      message: 'Por favor ingresa tu calle y número',
                    },
                  ]}
                >
                <Input />
                </Form.Item>
                <Form.Item 
                label="Colonia" 
                name="colonia"
                rules={[
                    {
                      type: 'string',
                      message: 'No es una colonia válida',
                    },
                    {
                      required: true,
                      message: 'Por favor ingresa tu colonia',
                    },
                    {
                      pattern: /^[ÁÉÍÓÚáéíóúñÑüÜÀÈÌÒÙàèìòù.A-Za-z\s]+$/,
                      message: 'Sólo se permiten letras en este campo'
                    },
                  ]}
                >
                <Input />
                </Form.Item>
                <Form.Item 
                label="Ciudad/Municipio" 
                name="ciudad"
                rules={[
                    {
                      type: 'string',
                      message: 'No es una ciudad o municipio válidos',
                    },
                    {
                      required: true,
                      message: 'Por favor ingresa tu ciudad o municipio',
                    },
                    {
                      pattern: /^[ÁÉÍÓÚáéíóúñÑüÜÀÈÌÒÙàèìòù.A-Za-z\s]+$/,
                      message: 'Sólo se permiten letras en este campo'
                    },
                  ]}
                >
                <Input />
                </Form.Item>
                <Form.Item 
                label="Estado"
                name="estado"
                required>
                <Select>
                    <Select.Option value="Aguascalientes">Aguascalientes</Select.Option>
                    <Select.Option value="Baja California Norte">Baja California Norte</Select.Option>
                </Select>
                </Form.Item>
                <Form.Item 
                label="Código Postal" 
                name="cp"
                rules={[
                    {
                      type: 'string',
                      message: 'No es un código postal válido',
                    },
                    {
                      required: true,
                      message: 'Por favor ingresa tu código postal de 5 dígitos',
                    },
                    {
                      pattern: /^\d\d\d\d\d$/,
                      message: 'Por favor ingresa tu código postal de dígitos. Sólo se permiten números en este campo'
                    },
                  ]}
                >
                <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={this.state.submitloading}>
                    Continuar
                    </Button>
                </Form.Item>
            </Form>
        </div>
        // <Container>
        //     <Form onSubmit={this.handleSubmit}>
        //         <Form.Field>
        //         <Form.Input
        //             label="Nombre Completo"
        //             name="nombrecomp"
        //             value={this.state.nombrecomp}
        //             onChange={this.handleFormChange}
        //             pattern="[ÁÉÍÓÚáéíóúñÑüÜÀÈÌÒÙàèìòù.A-Za-z ]+"
        //             onInvalid={this.setCustomValidity}
        //             error={this.state.nombrecomp_validator}
        //             required
        //             />
        //         </Form.Field>
        //         <Form.Field>
        //         <Form.Input
        //             label="Correo Electrónico"
        //             type="email"
        //             name="email"
        //             value={this.state.email}
        //             onChange={this.handleFormChange}
        //             required
        //             />
        //         </Form.Field>
        //         <Form.Field>
        //         <Form.Input
        //             label="Número de teléfono"
        //             name="telefono"
        //             value={this.state.telefono}
        //             onChange={this.handleFormChange}
        //             pattern="\d\d\d\d\d\d\d\d\d\d"
        //             onInvalid={this.setCustomValidity}
        //             error={this.state.telefono_validator}
        //             required
        //         />
        //         </Form.Field>
        //         <Form.Field>
        //         <Form.Input
        //             label="Calle y número"
        //             name="calle"
        //             value={this.state.calle}
        //             onChange={this.handleFormChange}
        //             required
        //         />
        //         </Form.Field>
        //         <Form.Field>
        //         <Form.Input
        //             label="Colonia"
        //             name="colonia"
        //             value={this.state.colonia}
        //             onChange={this.handleFormChange}
        //             pattern="[ÁÉÍÓÚáéíóúñÑüÜÀÈÌÒÙàèìòù.A-Za-z ]+"
        //             onInvalid={this.setCustomValidity}
        //             error={this.state.colonia_validator}
        //             required
        //         />
        //         </Form.Field>
        //         <Form.Field>
        //         <Form.Input
        //             label="Ciudad/Municipio"
        //             name="ciudad"
        //             value={this.state.ciudad}
        //             onChange={this.handleFormChange}
        //             pattern="[ÁÉÍÓÚáéíóúñÑüÜÀÈÌÒÙàèìòù.A-Za-z ]+"
        //             onInvalid={this.setCustomValidity}
        //             error={this.state.ciudad_validator}
        //             required
        //         />
        //         </Form.Field>
        //         <Form.Field>
        //         <label> Estado </label>
        //         <select name="estado" onChange={this.handleFormChange} value={this.state.estado}>
        //             <option value="Aguascalientes">Aguascalientes</option>
        //             <option value="Baja California Norte">Baja California Norte</option>
        //         </select>
        //         </Form.Field>
        //         <Form.Field>
        //         <Form.Input
        //             label="Código postal"
        //             name="cp"
        //             value={this.state.cp}
        //             onChange={this.handleFormChange}
        //             pattern="\d\d\d\d\d"
        //             onInvalid={this.setCustomValidity}
        //             error={this.state.cp_validator}
        //             required
        //         />
        //         </Form.Field>

        //         <Form.Field>
        //         <Button content="Continuar" type="submit" primary />{" "}
        //         </Form.Field>
        //     </Form>
        // </Container>
        )
    }
}

export default withRouter(ClientDataForm)
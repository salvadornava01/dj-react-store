import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
// import { Button, Container, Dimmer, Loader, Form, Message } from "semantic-ui-react";
import {
  Alert,
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import { authSignup } from "../actions/auth";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }
  handleSubmit(event) {
    this.props.authSignup(
      this.state.name,
      this.state.email,
      this.state.password
    );
    event.preventDefault();
    // this.props.history.push("/productos");
  }
  
  handleFormFinish = (values) => {
    this.props.authSignup(
      values.username,
      values.email,
      values.password,
      values.passwordconfirm,
    );
  }
  
  componentDidUpdate(){
    console.log(this.props.isAuthenticated)
    //provisionaly redirect to products, it needs to redirect to "My profile to add an adress"
    this.props.history.push("/productos");
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    // const [form] = Form.useForm();
    return (
      // <Container text>
      //   {this.props.error !== null ? (
      //     <Message
      //       error
      //       header="Ocurrió un error"
      //       content={this.props.error.message}
      //     />
      //   ) : (
      //     ""
      //   )}
      //   {this.props.isloading ? (
      //     <div style={{ margin: 100 }}>
      //       <Dimmer active inverted>
      //         <Loader size="large">Loading</Loader>
      //       </Dimmer>
      //     </div>
      //   ) : (
      //     <Form onSubmit={this.handleSubmit}>
      //       <Form.Field>
      //         <Form.Input
      //           label="Nombre"
      //           name="name"
      //           value={this.state.name}
      //           onChange={this.handleChange}
      //           required
      //         />
      //       </Form.Field>
      //       <Form.Field>
      //         <Form.Input
      //           label="Email"
      //           name="email"
      //           type="email"
      //           value={this.state.email}
      //           onChange={this.handleChange}
      //           required
      //         />
      //       </Form.Field>
      //       <Form.Field>
      //         <Form.Input
      //           label="Password"
      //           type="password"
      //           placeholder="password"
      //           name="password"
      //           value={this.state.password}
      //           onChange={this.handleChange}
      //           required
      //         />
      //       </Form.Field>
      //       <Form.Field>
      //         <Button
      //           content="Registrarme"
      //           type="submit"
      //           basic color='blue'
      //         />{" "}
      //       </Form.Field>
      //     </Form>
      //   )}
      // </Container>
      <div style={{maxWidth:450, marginLeft:'auto', marginRight:'auto'}}>
        {this.props.error !== null ? (
          <Alert message={this.props.error.message} type="error" />
        ) : (
          ""
        )}
        <br/>
        <Form
          {...formItemLayout}
          // form={form}
          name="register"
          onFinish={this.handleFormFinish}
          // initialValues={{
          //   residence: ['zhejiang', 'hangzhou', 'xihu'],
          //   prefix: '86',
          // }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                type: 'string',
                message: 'No es un nombre de usuario válido!',
              },
              {
                required: true,
                message: 'Ingresa un nombre de usuario!',
              },
              {
                pattern: /^[a-z0-9\@\-\.\_\+]+$/,
                message: 'Sólo letras minúsculas, números y sin espacios. Puedes usar estos caracteres para separar palabras: @ . - _ + '
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'Por favor ingresa un e-mail válido!',
              },
              {
                required: true,
                message: 'Por favor ingresa tu e-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="passwordconfirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isloading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter(connect(mapStateToProps, { authSignup })(LoginForm));

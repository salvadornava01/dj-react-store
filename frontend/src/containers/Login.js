import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { Alert, Form, Input, Button } from 'antd';
import { authLogin, authGetClientData } from "../actions/auth";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }
  handleSubmit(event) {
    this.props.authLogin(this.state.email, this.state.password);
    this.props.authGetClientData()
    event.preventDefault();
    // this.props.history.push("/productos");
  }
  formSuccess = (values) => {
    this.props.authLogin(values.username, values.password);
    this.props.authGetClientData()
  }
  render() {
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
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
      //           label="Email"
      //           name="email"
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
      //         <Button content="Login" type="submit" primary/>{" "}
      //         O{" "}
      //         <Link
      //           to={{
      //             pathname: `/signup`,
      //             state: { fromDashboard: false }
      //           }}
      //         >
      //           <Button content="Regístrate" basic color='blue' />
      //         </Link>
      //       </Form.Field>
      //     </Form>
      //   )}
      // </Container>
      <div>
        {this.props.error !== null ? (
          <Alert message={this.props.error.message} type="error" />
        ) : (
          ""
        )}
        <br/>
        <Form
          {...{
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          }}
          name="basic"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          onFinish={this.formSuccess}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item >
            <div style={{textAlign:'center'}}>
            <Button type="primary" htmlType="submit" style={{ margin: '0 8px' }} loading={this.props.isloading}>
              Login
            </Button>
            Ó
            <Button htmlType="button" style={{ margin: '0 8px' }} onClick={() => this.props.history.push("/signup")}>
              Regístrate
            </Button>
            </div>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isloading: state.auth.loading,
    error: state.auth.error
  };
};

export default withRouter(connect(mapStateToProps, { authLogin, authGetClientData })(LoginForm));

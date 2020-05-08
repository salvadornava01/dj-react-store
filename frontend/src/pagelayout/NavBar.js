import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { cartDeleteItem } from "../actions/cart";
import LoginModal from './LoginModal'
import { Avatar, Layout, Menu, notification } from 'antd';
import { ShoppingCartOutlined, CloseCircleOutlined, ArrowRightOutlined, UserOutlined  } from '@ant-design/icons';
const { Header} = Layout;
const { SubMenu } = Menu;

const openNotification = (product) => {
  notification['success']({
    message: 'Producto agregado!',
    description:
      <div>
        <Avatar shape="square" size="large" src={product.image_url} />
        <p>{product.title}</p>
      </div>,
    duration: 2,
    style: {
      width: 300,
      marginLeft: 100,
    },
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "", display_cart:false, showLogin: false };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleDeleteCartItem = this.handleDeleteCartItem.bind(this);
    this.handleGoCheckout = this.handleGoCheckout.bind(this);
    this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
    this.handleOpenLoginModal = this.handleOpenLoginModal.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleDeleteCartItem(product_id) {
    this.props.cartDeleteItem(product_id);
  }
  handleGoCheckout(event) {
    this.props.history.push("/checkout-summary");
  }

  componentDidUpdate(){
    const { cart_product_added } = this.props
    if (cart_product_added != null){
      openNotification(cart_product_added)
    }
  }
  handleCloseLoginModal(){
    this.setState({
      showLogin: false
    })
  }
  handleOpenLoginModal(){
    this.setState({
      showLogin: true
    })
  }
  componentWillReceiveProps(){
    if(!this.props.isAuthenticated){
      this.setState({
        showLogin:false
      })
    } 
  }
  componentWillMount(){
    console.log('kiii mount')
    if(this.props.isAuthenticated){
      this.setState({
        showLogin:false
      })
    } 
  }
  render() {
    const { activeItem } = this.state;
    const { cart_items } = this.props
    const { showLogin } = this.state;
    let cart_items_len = 0
    Object.keys(cart_items).forEach((key)=>{ cart_items_len += cart_items[key].quantity})
    const cart_array = Object.keys(cart_items).map(key =>{return cart_items[key]})
    return (
      // <Menu fixed="top" inverted>
      //   <Link
      //     to={{
      //       pathname: "/",
      //       state: { fromDashboard: false }
      //     }}
      //   >
      //     <Menu.Item header>
      //       <img
      //         alt=""
      //         src="https://i.ibb.co/gZ6w1qr/output-onlinepngtools-1.png"
      //       />
      //     </Menu.Item>
      //   </Link>
      //   <Menu.Item>
      //     <Link
      //       to={{
      //         pathname: "/productos",
      //         state: { fromDashboard: false }
      //       }}
      //     >
      //       Productos
      //     </Link>
      //   </Menu.Item>
      //   <Menu.Item as='a' onClick={openNotification}>
          
      //       Productos
      //   </Menu.Item>
      //   <Menu.Item position="right">
      //     <Dropdown
      //       text={`${cart_items_len}`}
      //       icon="shopping cart"
      //       floating
      //       labeled
      //       direction="left"
      //       button
      //       className="icon"
      //     >
      //       <Dropdown.Menu>
      //         <Dropdown.Header content="---- PRODUCTOS EN TU CARRITO ----" />
      //         {cart_array.map((cart_item, index) => {
      //           return (
      //             <Dropdown.Item
      //               key={index}
      //               icon="delete"
      //               text={cart_item.product_data.title}
      //               description={cart_item.quantity}
      //               image={cart_item.product_data.image_url}
      //               onClick={() => this.handleDeleteCartItem(cart_item.product_id)}
      //             />
      //           );
      //         })}
      //         <Link
      //           to={{
      //             pathname: "/checkout-summary",
      //             state: { fromDashboard: false }
      //           }}
      //           style={{ textDecoration: "none" }}
      //         >
      //           <Dropdown.Item
      //             icon="arrow right"
      //             text="Checkout"
      //             onClick={this.handleGoCheckout}
      //             style={{ color: "black" }}
      //           />
      //         </Link>
      //       </Dropdown.Menu>
      //     </Dropdown>
      //   </Menu.Item>
      //   {this.props.isAuthenticated ? (
      //     <Menu.Item
      //       name="Logout"
      //       active={activeItem === "Logout"}
      //       onClick={this.props.logout}
      //     >
      //       Logout
      //     </Menu.Item>
      //   ) : (
      //     <Menu.Item>
      //       <Link
      //         to={{
      //           pathname: "/login",
      //           state: { fromDashboard: false }
      //         }}
      //       >
      //         Login
      //       </Link>
      //     </Menu.Item>
      //   )}
      // </Menu>
      <Layout className="layout">
        <Header style={{paddingLeft:'0', paddingRight:'0', position: 'fixed', zIndex: 1, width: '100%'}}>
          <Menu theme="dark" mode="horizontal" selectedKeys={[this.state.current]}>
            <Menu.Item key="home" onClick={()=>this.props.history.push("/")}>
              <Avatar shape="square" src='https://i.ibb.co/gZ6w1qr/output-onlinepngtools-1.png'/>
            </Menu.Item>
            <Menu.Item key="productos" onClick={()=>this.props.history.push("/productos")}>
              Productos
            </Menu.Item>
            {this.props.isAuthenticated ? 
            <SubMenu style={{float:'right'}} icon={<UserOutlined />} key="profile-info">
              <Menu.ItemGroup title="Mi Cuenta">
              <Menu.Item key="pedidos" onClick={()=>console.log('Go Configuracion')}>
                Configuración
              </Menu.Item>
              <Menu.Item key="Logout" onClick={this.props.logout}>
                Logout
              </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            :
              <Menu.Item style={{float:'right'}} key="Login" onClick={this.handleOpenLoginModal}>
                Login
              </Menu.Item>
            }

            <SubMenu icon={<ShoppingCartOutlined />} title={cart_items_len} key="carrito">
              <Menu.ItemGroup title="Carrito">
                {cart_array.map((cart_item, index) => {
                return (
                  <Menu.Item
                    key={index}
                    onClick={() => this.handleDeleteCartItem(cart_item.product_id)}
                    icon={<CloseCircleOutlined />}
                  > 
                    <Avatar src={cart_item.product_data.image_url} />
                    {cart_item.quantity} X {cart_item.product_data.title} 
                  </Menu.Item>
                );
              })}
              <Menu.Item
                key="checkout-key"
                icon={<ArrowRightOutlined />}
                onClick={this.handleGoCheckout}
              >
                Checkout
              </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
          <LoginModal visible={showLogin } closeModal={this.handleCloseLoginModal}/>
        </Header>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    cart_items: state.cart.cart_data,
    cart_product_added: state.cart.cart_product_added
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    cartDeleteItem: product_id => dispatch(cartDeleteItem(product_id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

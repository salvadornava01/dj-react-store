import React, {Component, Suspense, lazy} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../actions/auth";
import {cartDeleteItem, fetchCart} from "../actions/cart";
import PropTypes from "prop-types";

const LoginModal = lazy(() => import('./LoginModal'));
import {Avatar, Layout, Menu, notification} from 'antd';
import CartItemDetail from "../containers/CartItemDetail";

const {Header} = Layout;
const {SubMenu} = Menu;

const iconify = (icon) => {
    return (
        <span style={{margin: "0 5px"}}>
      {icon}
    </span>
    );
};

const openNotification = (product) => {
    notification['success']({
        message: 'Producto agregado!',
        description:
            <div>
                <Avatar shape="square" size="large" src={product.image_url}/>
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
        this.state = {activeItem: "", display_cart: false, showLogin: false};

        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleGoCheckout = this.handleGoCheckout.bind(this);
        this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
        this.handleOpenLoginModal = this.handleOpenLoginModal.bind(this);
    }

    static propTypes = {
        cartDeleteItem: PropTypes.func.isRequired,
        cartAddItem: PropTypes.func.isRequired,
        cart_product_added: PropTypes.object,
        isAuthenticated: PropTypes.bool.isRequired,
        cart_items: PropTypes.object.isRequired,
        history: PropTypes.object,
        logout: PropTypes.func
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    componentDidUpdate() {
        const {cart_product_added} = this.props;
        if (cart_product_added != null) {
            openNotification(cart_product_added);
        }
    }

    handleCloseLoginModal() {
        this.setState({
            showLogin: false
        });
    }

    handleGoCheckout(event) {
        this.props.history.push("/checkout-summary");
    }

    handleOpenLoginModal() {
        this.setState({
            showLogin: true
        });
    }

    UNSAFE_componentWillReceiveProps() {
        if (!this.props.isAuthenticated) {
            this.setState({
                showLogin: false
            });
        }
    }

    UNSAFE_componentWillMount() {
        if (this.props.isAuthenticated) {
            this.setState({
                showLogin: false
            });
        }
    }

    render() {
        const {cart_items} = this.props;
        const {showLogin} = this.state;
        let cart_items_len = 0;
        Object.keys(cart_items).forEach((key) => {
            cart_items_len += cart_items[key].quantity;
        });
        const cart_array = Object.keys(cart_items).map(key => {
            return cart_items[key];
        });
        return (
            <Layout className="layout">
                <Header style={{paddingLeft: '0', paddingRight: '0', position: 'fixed', zIndex: 1, width: '100%'}}>
                    <Menu theme="light" mode="horizontal" selectedKeys={[this.state.current]}>
                        <Menu.Item key="home" onClick={() => this.props.history.push("/")}>
                            <Avatar shape="square" src='https://i.ibb.co/gZ6w1qr/output-onlinepngtools-1.png'/>
                        </Menu.Item>
                        <Menu.Item key="productos" onClick={() => this.props.history.push("/productos")}>
                            Productos
                        </Menu.Item>
                        {this.props.isAuthenticated ?
                            <SubMenu style={{float: 'right'}} icon={iconify(<i className="far fa-user"></i>)}
                                     key="profile-info">
                                <Menu.ItemGroup title="Mi Cuenta">
                                    <Menu.Item key="pedidos" onClick={() => this.props.history.push("/account")}>
                                        Configuración
                                    </Menu.Item>
                                    <Menu.Item key="Logout" onClick={this.props.logout}>
                                        Logout
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            :
                            <Menu.Item style={{float: 'right'}} key="Login" onClick={this.handleOpenLoginModal}>
                                Login
                            </Menu.Item>
                        }

                        <SubMenu icon={iconify(<i className="fas fa-shopping-cart"></i>)} title={cart_items_len}
                                 key="carrito">
                            <Menu.ItemGroup title="Carrito">
                                {cart_array.map((cart_item, index) => (
                                    <CartItemDetail key={`cartItem-${index}`} cart_item={cart_item} index={index}/>
                                    ))}
                                <Menu.Item
                                    key="checkout-key"
                                    icon={iconify(<i className="fas fa-arrow-right"></i>)}
                                    onClick={this.handleGoCheckout}
                                >
                                    Ver carrito
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                    </Menu>
                    <Suspense fallback={<div></div>}>
                        <LoginModal visible={showLogin} closeModal={this.handleCloseLoginModal}/>
                    </Suspense>
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
        cartDeleteItem: product_id => dispatch(cartDeleteItem(product_id)),
        cartAddItem: product_id => dispatch(fetchCart(product_id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

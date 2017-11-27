import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import Badge from "material-ui/Badge";

import cart_img from "./cart-logo.svg";
import { requestUser, refreshCart, removeFromCart } from "../../ducks/reducer";

import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => {this.setState({ open: false })};

  handleLogin() {
    window.location.href = "http://localhost:3001/login";
  }
  
  componentDidMount() {
    // axios.get("/api/me").then(response => {
    //    if (!response.data) this.setState({ user: null });
    //    else this.setState({ user: response.data });
    //  });
    this.props.requestUser();
    this.props.refreshCart();
    this.setState({ open: false });
  }
  
  handleLogout() {
    window.location.href = "http://localhost:3001/logout";
  }

  render() {
    const guy = this.props.user.authid;
    const logInText = function() {
      if (guy) {
        return "LOG OUT";
      } else {
        return "LOG IN";
      }
    };
    const cartNumber = this.props.cart.length ? this.props.cart.length : "";
    const items = [];
    for (let i = 0; i < this.props.cart.length; i++) {
      items.push(



       //ITEMS TO GO IN THE CART DISPLAY



        <MenuItem
        className="cart-drawer"
          onClick={this.handleClose}
          value={this.props.cart[i].product_id}
          key={i}
        >
          <Link to={`/details/${this.props.cart[i].product_id}`}>
            <div className="sides">
              <div className="left-side">
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={`${this.props.cart[i].image_url}`}
                />
              </div>
              <div
                className="right-side"
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div>{`${this.props.cart[i].name}`}</div>
                <div>{` - $${this.props.cart[i].price}`}</div>
                <RaisedButton
                onClick={()=>this.props.removeFromCart(this.props.cart[i].product_id)}
                primary
                label="REMOVE"
                fullWidth={true}
              />
              </div>
            </div>
          </Link>
        </MenuItem>




      );
    }
    return (
      <div className="nav-whole">
        <Link to="/">
          <div className="nav-logo">
            <img
              style={{ width: "100px" }}
              src="https://cdn.shopify.com/s/files/1/1204/3438/files/Bon-Tot-Edinburgh-Logo_57786928-f63e-4872-be6a-603a79953edd_600x.png?v=1505911147"
            />
          </div>
          
        </Link>
        <Link to="/men">
          <div className="nav-men">MEN</div>
        </Link>
        <Link to="/women">
          <div className="nav-women">WOMEN</div>
        </Link>
        <Link to="/accessories">
          <div className="nav-acc">ACCESSORIES</div>
        </Link>

      { cartNumber ?
        <div className="nav-signIn-cart">
          {this.props.user.name}

          <a onClick={ this.props.user.authid ? this.handleLogout : this.handleLogin}>
            {logInText()}
          </a> 


          {cartNumber ? (
            <a>
              <Badge id="cart-badge" badgeContent={cartNumber} primary={true}>
                <img src={cart_img} onClick={this.handleToggle} />
              </Badge>
            </a>
          ) : (
            <a>
              <img id="just-cart" src={cart_img} onClick={this.handleToggle} />
            </a>
          )}
        </div>
        : 
        <div className="nav-signIn-cart" id="nav-signIn-noBadge">
        {this.props.user.name}

        <a onClick={ this.props.user.authid ? this.handleLogout : this.handleLogin}>
          {logInText()}
        </a> 


        {cartNumber ? (
          <a>
            <Badge id="cart-badge" badgeContent={cartNumber} primary={true}>
              <img src={cart_img} onClick={this.handleToggle} />
            </Badge>
          </a>
        ) : (
          <a>
            <img id="just-cart" src={cart_img} onClick={this.handleToggle} />
          </a>
        )}
      </div>

      }




        {/* -------------------------------------------------- */}
        <Drawer 
          containerStyle={{backgroundColor: "grey"}}
          docked={false}
          width={400}
          openSecondary={true}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          {this.props.cart.length ? items : "Your cart is empty"}
          {this.props.cart.length ? (
            <Link to="/checkout">
              {" "}
              <RaisedButton
                style={{bottom: 0, }}
                onClick={this.handleClose}
                primary
                label="CHECK OUT"
                fullWidth={true}
              />
            </Link>
          ) : (
            <RaisedButton
              onClick={this.handleClose}
              primary
              label="SHOP"
              fullWidth={true}
            />
          )}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser, refreshCart, removeFromCart })(NavBar);

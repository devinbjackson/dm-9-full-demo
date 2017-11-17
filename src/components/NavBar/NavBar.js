import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import logo_img from "./cart_logo.png";
import { requestUser, refreshCart } from "../../ducks/reducer";

import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }
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
    const cartNumber = (this.props.cart.length? this.props.cart.length : "");

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

        <div className="nav-signIn-cart">
          {this.props.user.name}
          <a
            onClick={
              this.props.user.authid ? this.handleLogout : this.handleLogin
            }
          >
            {logInText()}
          </a>
          {cartNumber}
          <img src={logo_img} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser, refreshCart })(NavBar);

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";

import './NavBar.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
    
        this.handleLogin = this.handleLogin.bind(this);
      }
      handleLogin() {
        window.location.href = "http://localhost:3001/login";
      }
      showLogInOrOut(){
          if(this.props.loggedIn){
              return "LOGOUT"
          }
          else {
              return "SIGN IN"
          }
      }

    render() {
        return (
           <div className="nav-whole">
               <Link to="/">
               <div className="nav-logo"><img style={{width: "100px"}} src="https://cdn.shopify.com/s/files/1/1204/3438/files/Bon-Tot-Edinburgh-Logo_57786928-f63e-4872-be6a-603a79953edd_600x.png?v=1505911147"/>
               </div>
               </Link>


               <Link to="/men"><div className="nav-men">MEN</div></Link>
               <Link to="/women"><div className="nav-women">WOMEN</div></Link>
               <Link to="/accessories"><div className="nav-acc">ACCESSORIES</div></Link>


               <div className="nav-signIn-cart">
               <a onClick={this.handleLogin}>{this.showLogInOrOut()}</a> 
                *CART LOGO*
                </div>

           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(NavBar);
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";

import Checkout from "../../Checkout";
import './CartDisplay.css';

class CartDisplay extends Component {
    constructor(props) {
        super(props);


      }
     

      

    render() {
      
       const list = this.props.cart.length? this.props.cart.map(function(item){
            return (<Link to={`/details/${item.product_id}`}>
             <div className="cart-list-item">
              <div className="cart-list-image" style={{backgroundImage: `url(${item.image_url})`}}>
              </div>
              {item.name}
              </div>
              </Link>)
            }):"";
        const total = this.props.cart.length ? this.props.cart.reduce(function(acc, item){
            
            return acc + parseFloat(item.price);

        }, 0):0;

        return (
        <div>
           <h1 className="cartDisplay-whole">
                    SHOPPING CART
           </h1> 
           <h1>X</h1>
           <div id="cart-view-box">
           {list} 
           </div>
           <Checkout
            name={'Payment'}
            description={'Powered By Stripe'}
            amount={total}
           /> 
           </div>
           
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(CartDisplay);
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";

import './AddToCart.css';
import { getNumberForCart , addToCart } from '../../ducks/reducer';

class AddToCart extends Component {
    //      console.log(response.data[0])
    constructor(props) {
        super(props);

      }

    render() {
        // console.log(this.state.product)
        //const item = this.state.product ? this.state.product : "";
        const { product } = this.props

        return (
           <div className="addToCart-whole">
             <button onClick={() => this.props.addToCart(product)}>ADD TO CART</button>
            Product ID is {product.product_id}
            
            

           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps, {addToCart})(AddToCart);
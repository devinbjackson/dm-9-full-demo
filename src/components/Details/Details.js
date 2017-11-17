import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";

import AddToCart from "../AddToCart/AddToCart";
import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        
        this.state ={
            product: {}
        }

      }

      componentDidMount(){
        axios.get(`/api/details/${this.props.match.params.id}`)
        .then(response =>{ 
        this.setState({product: response.data[0]})
        })
      }

    render() {
        const product = this.state.product ? this.state.product : "";
        
        return (
           <div className="details-whole">
              <div className="detailsCard">



               {product.name}
               {product.price}
               <img style={{width: "100px", height: "200px"}}  src={product.image_url}/>




              </div>
              <AddToCart product={product}/>

           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(Details);
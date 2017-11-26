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
            product: {},
            currentImageUrl: ''
        }
        this.changePicture = this.changePicture.bind(this)
      }

      changePicture(url){
        this.setState({currentImageUrl: url})
      }


      componentDidMount(){
        axios.get(`/api/details/${this.props.match.params.id}`)
        .then(response =>{ 
        this.setState({product: response.data[0],
                       currentImageUrl: response.data[0].image_url })
        })
      }

    render() {
        const product = this.state.product ? this.state.product : "";

        return (
           <div className="details-whole">
           <div className="other-images">
           <a onClick={()=>this.changePicture(product.image_url)}>{product.image_url ?<img style={{width: "100%", height: "15%", objectFit: "contain"}}  src={product.image_url}/>:''}</a>
           <a onClick={()=>this.changePicture(product.image2_url)}>{product.image2_url?<img style={{width: "100%", height: "15%", objectFit: "contain"}}  src={product.image2_url}/>:''}</a>
           <a onClick={()=>this.changePicture(product.image3_url)}>{product.image3_url?<img style={{width: "100%", height: "15%", objectFit: "contain"}}  src={product.image3_url}/>:''}</a>
           <a onClick={()=>this.changePicture(product.image4_url)}>{product.image4_url?<img style={{width: "100%", height: "15%", objectFit: "contain"}}  src={product.image4_url}/>:''}</a>
           </div>
           <div className="detail-image-card">
            <img style={{width: "100%", height: "100%", objectFit: "cover"}}  src={this.state.currentImageUrl}/>
            </div>
              <div className="details-card">
               <h1>{product.name}</h1>
               {product.description}
               {product.price? `$${product.price}`:''}
              <AddToCart product={product}/>
              </div>
              


               


           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(Details);
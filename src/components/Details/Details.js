import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";

import FavoriteHeartBig from '../FavoriteHeart/FavoriteHeartBig';
import FavoriteHeart from '../FavoriteHeart/FavoriteHeart';
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

      componentDidUpdate() {
        if (this.props.match.params.id !== this.state.product.product_id)
          axios.get(`/api/details/${this.props.match.params.id}`)
          .then(response =>{ 
          this.setState({product: response.data[0]})
          })
      }



    render() {

        const product = this.state.product ? this.state.product : "";

        return (
           <div className="details-whole" key={this.props.match.params.id}>
           <div className="other-images">
           <a onClick={()=>this.changePicture(product.image_url)}>{product.image_url ?<img style={{width: "100%", height: "15%", objectFit: "contain"}}  src={product.image_url}/>:''}</a>
           <a onClick={()=>this.changePicture(product.image2_url)}>{product.image2_url?<img style={{width: "100%", height: "15%", objectFit: "contain"}}  src={product.image2_url}/>:''}</a>
           <a onClick={()=>this.changePicture(product.image3_url)}>{product.image3_url?<img style={{width: "100%", height: "15%", objectFit: "contain"}}  src={product.image3_url}/>:''}</a>
           <a onClick={()=>this.changePicture(product.image4_url)}>{product.image4_url?<img style={{width: "100%", height: "15%", objectFit: "contain"}}  src={product.image4_url}/>:''}</a>
           </div>
           <div className="detail-image-card">
           <div style={{display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        height:'100%'}}>
            <FavoriteHeart product={this.state.product}/>
            <div style={{width: "100%", height: "100%", backgroundPosition: 'center',backgroundSize: "cover",backgroundColor:'rgb(238, 238, 238)', backgroundImage: `url(${this.state.currentImageUrl})`}}/>
            </div>
            </div>
              <div className="details-card">
               <h1>{product.name}</h1>
               <div>{product.description}</div>
              <div style={{fontSize:"1.3em"}}> {product.price? `$${product.price}`:''}</div>
              <FavoriteHeartBig product={product}/>
              <AddToCart product={product}/>
              </div>
              


           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(Details);
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import FavoriteHeartBig from '.././FavoriteHeart/FavoriteHeartBig'
import './ProductListCard.css';

class ProductListCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {}
        }
 
      }

      componentDidMount(){
        axios.get(`/api/details/${this.props.id}`)
        .then(response =>{ 
        this.setState({product: response.data[0]})
        })
      }

    render() {
        const style = {
            height: 100,
            width: 100,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
          };
          const product = this.state.product ? this.state.product : "";
          console.log(product.image_url)
         return (

            <div  className="product-list-card-whole">
                <div className="product-list-card-image" style={{backgroundImage:"url(" + product.image_url + ")"}}>
                    </div>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around", width: '80%'}}>
               <span> {product.name}</span>
               <span>{product.price}</span>
                </div>
                <FavoriteHeartBig product={product}/>
            </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(ProductListCard);
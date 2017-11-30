import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import FavoriteHeart from '.././FavoriteHeart/FavoriteHeart'
import './UserPage.css';
import { relative } from 'path';

class UserPage extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            orders: {}
        }
 
      }

    componentDidMount(){
        axios.get(`/api/orders/${this.props.user.vintage_user_id}`)
        .then(function(response) {
            console.log(response.data)
            return this.setState({orders: response.data})
        }).catch(function(error) {
            console.log(error);
        })
    }

    render() { 
        const itemsInCart = [];
        
                for (let i = 0; i < this.props.cart.length; i++) {
                  itemsInCart.push(
                   
                      <div>
                      <Link to={`/details/${this.props.cart[i].product_id}`}>
                        <div className="sides orders">
                          <div className="left-side orders">
                            <img src={`${this.props.cart[i].image_url}`} />
                          </div>
                          <div
                            className="right-side orders"
                            style={{
                              display: "flex",
                              flexDirection: "column"
                            }}
                          >
                            <div>{`${this.props.cart[i].name}`}</div>
                            <div>{` - $${this.props.cart[i].price}`}</div>
                          </div>
                        </div>
                      </Link>
                      
                    </div>
        
            
                  );
                }

        return (
           <div className="user-page-whole">
               <div className="user-page-sides">

               <div className="user-page-left">
               Your Orders
               {itemsInCart}
               </div>
               <div className="divider">
               <div className='bar'>
               </div>
               <div className='bar'>
               </div>
               </div>
               <div className="user-page-right">
               Your Favorites
               {itemsInCart}
               </div>
               </div>
           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(UserPage);
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import {requestUser, requestOrders} from '../../ducks/reducer';
import FavoriteHeart from '.././FavoriteHeart/FavoriteHeart'
import './UserPage.css';
import { relative } from 'path';



class UserPage extends Component {
    constructor(props) {
        super(props);
        
      }

    componentDidMount(){
        this.props.requestUser()
        .then((response)=>{this.props.requestOrders(response.value.vintage_user_id), console.log(this.props.orders)})
    }

    render() { 
       console.log("useruseruser man", this.props)
        const itemsInOrders = [];
        
             for (let i = 0; i < this.props.orders.length; i++) {
                  itemsInOrders.push(
                      <div>
                      <Link to={`/details/${this.props.orders[i].product_id}`}>
                        <div className="sides orders">
                          <div className="left-side orders">
                          {this.props.orders[i].product_id}
                          </div>
                          <div
                            className="right-side orders"
                            style={{
                              display: "flex",
                              flexDirection: "column"
                            }}
                          >
                          </div>
                        </div>
                      </Link>
                      
        </div>
        
            
                 );
                 }
                // const itemsInCart = [];
        
                // for (let i = 0; i < this.props.cart.length; i++) {
                //   itemsInCart.push(
                   
                //       <div>
                //       <Link to={`/details/${this.props.cart[i].product_id}`}>
                //         <div className="sides orders">
                //           <div className="left-side orders">
                //             <img src={`${this.props.cart[i].image_url}`} />
                //           </div>
                //           <div
                //             className="right-side orders"
                //             style={{
                //               display: "flex",
                //               flexDirection: "column"
                //             }}
                //           >
                //             <div>{`${this.props.cart[i].name}`}</div>
                //             <div>{` - $${this.props.cart[i].price}`}</div>
                //           </div>
                //         </div>
                //       </Link>
                      
                //     </div>
        
            
                //   );
                // }       

        return (
           <div className="user-page-whole">
               <div className="user-page-sides">

               <div className="user-page-left">
               <h1>Your Orders</h1>
               {itemsInOrders}
               </div>

               <div className="divider">
               <div className='bar'>
               </div>
               <div className='bar'>
               </div>
               </div>

               <div className="user-page-right">
               <h1>Your Favorites</h1>
               {/* {itemsInCart} */}
               </div>

               </div>
           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, requestOrders})(UserPage);
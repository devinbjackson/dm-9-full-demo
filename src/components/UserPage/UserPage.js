import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import ProductListCard from '.././ProductListCard/ProductListCard';

import {requestUser, requestOrders, refreshFaves} from '../../ducks/reducer';
import FavoriteHeart from '.././FavoriteHeart/FavoriteHeart'
import './UserPage.css';
import { relative } from 'path';



class UserPage extends Component {
    constructor(props) {
        super(props);
        
      }

    componentDidMount(){
       this.props.refreshFaves()
        this.props.requestUser()
        .then((response)=>{this.props.requestOrders(response.value.vintage_user_id),
           console.log(this.props.orders)})
    }

    render() { 
        const itemsInFaves = [];
        const faves = this.props.faves? this.props.faves:'';
        console.log("faves",faves)
             for (let i = 0; i < faves.length; i++) {
                  itemsInFaves.push(
                      <div>
                      <Link to={`/details/${faves[i]}`}>
                          <ProductListCard id={faves[i]}/>
                      </Link>
                      </div>)}
        
        
        const orderNums = []                    
        for(let i = 0; i < this.props.orders.length; i++) {
          orderNums.push(this.props.orders[i].order_id)
        }

        // const orderNumList = new Set(orderNums);

        // const comboOrder = []
        // for (let i = 0; i < orderNumList.length; i++) {
        //   let groupArray = [];
        //     for(let j = 0; j < this.props.orders.length; j++){
        //      this.props.orders[j].order_id === item?
        //      groupArray.push(
        //        <div>
        //            {this.props.orders[j].product_id}
        //            {this.props.orders[j].product_price}
        //        </div>):'';
        //     }
        //   comboOrder.push(groupArray)  
        // }


        const orderNumList = new Set(orderNums);

        const comboOrder = [];
        for (let item of orderNumList) {
          let groupArray = [];
          let total = 0;
          for (let j = 0; j < this.props.orders.length; j++) {
            this.props.orders[j].order_id === item?(
            total = total + parseFloat(this.props.orders[j].product_price, 10),
            groupArray.push(
              <div >
                 Item #{this.props.orders[j].product_id} ........... ${this.props.orders[j].product_price}
              </div>)):'';
            
          }
          comboOrder.push(<div className="order-box">{groupArray} Total: ${total.toFixed(2)} </div>);
        
        }
         console.log(comboOrder)


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
               {comboOrder}
               </div>

               <div className="divider">
               <div className='bar'>
               </div>
               <div className='bar'>
               </div>
               </div>

               <div className="user-page-right">
               <h1>Your Favorites</h1>
                 <div className="user-page-list">
                {itemsInFaves} 
                 </div>

               </div>
           </div> 
           </div>
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, requestOrders, refreshFaves})(UserPage);
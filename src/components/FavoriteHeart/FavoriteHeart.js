import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";


import './FavoriteHeart.css';


class FavoriteHeart extends Component {
    //      console.log(response.data[0])
    constructor(props) {
        super(props);

        this.state={
            solid: false
        }
        
        this.handleClick = this.handleClick.bind(this)
      }

      handleClick(){
          this.setState({solid: !this.state.solid})
          console.log("clicked, liked")
      }

    render() {
        // console.log(this.state.product)
        //const item = this.state.product ? this.state.product : "";
        const { product } = this.props

        return (
           <div onClick={()=>this.handleClick} className="favorite-heart-whole">
                {this.state.solid?
                <i class="fa fa-heart fa-lg" aria-hidden="true"></i>
                :
                <i class="fa fa-heart-o fa-lg" aria-hidden="true"></i>
                }
           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(FavoriteHeart);
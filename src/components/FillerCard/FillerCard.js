import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import FavoriteHeart from '.././FavoriteHeart/FavoriteHeart'
import './FillerCard.css';
import { relative } from 'path';
import MEN from './MEN.jpg';
import WOMEN from './WOMEN.jpg';
import ACCESSORIES from './ACCESSORIES.jpg';

class FillerCard extends Component {
    constructor(props) {
        super(props);
        
        this.state ={
            list: [],
        }
 
      }

      componentDidMount(){
        axios.get(`/api/departments/filler/${this.props.name}`)
        .then(response =>{ 
        this.setState({list: response.data})
        })
        
      }

    render() {
        console.log(this.state.list[0])
        const list = 
         
        this.state.list.map(function(item){

         return (

         <div  className="list-item-whole">
            <FavoriteHeart product={item}/>
            <Link to={`/details/${item.product_id}`}>
                <a className="black-text list-item">
                <div className="list-image " style={{backgroundImage: `url(${item.image_url})`}}>
                <div className="image-price">{item.price}</div>
                </div>
                <div className="filler_image_name">
                {item.name}
                </div>
                </a>
            </Link>
        </div>
           )
        })

        return (
           <div className="filler-whole">
               <div class="top-margin">
               {this.props.name === 'ACCESSORIES'?
              <div className="title_text">NEW {this.props.name}</div>
              :
              <div className="title_text">NEW {this.props.name}'S ITEMS</div>
               }
               </div>
                    
                     <div className="filler-list">
                      {list} 
            <div className="effect7" style={{
                backgroundPosition:'center',
                 
                backgroundImage: `url(${
            this.props.name==='MEN'?MEN 
            :this.props.name==='WOMEN'?WOMEN 
            :this.props.name==='ACCESSORIES'?ACCESSORIES:''
            })`}}>
            <Link  to={`/${this.props.name}`}>
            <div className="bordered">
            <FlatButton className="see-button"  label={` SEE ${this.props.name}`} /></div>
            </Link>
            </div>
                    </div>

           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(FillerCard);
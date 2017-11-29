import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import FavoriteHeart from '.././FavoriteHeart/FavoriteHeart'


import './MenPage.css';

class MenPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
        list: []
    }

  }

  componentDidMount(){
    axios.get(`/api/departments/MEN`)
    .then(response =>{ 
    this.setState({list: response.data})

    })
  
  }
  render() {
    const list = 
    
    this.state.list.map(function(item){
    return (<Link to={`/details/${item.product_id}`}>
        <a className="black-text list-item">
           <div className="list-image" style={{backgroundImage: `url(${item.image_url})`}}>
           <FavoriteHeart/>
           </div>
           <div className="filler_image_name">
           {item.name}
           </div>
           </a>
           </Link>)
   })
    return (
        <div className="productPage-whole">
        <div className="page-image" style={{backgroundImage: `url(http://www.gap.com/Asset_Archive/GPWeb/content/0014/392/169/assets/desktop/01_DESK_IMG.jpg)`}}></div>
        <div className="filler-list"> {list}</div>
        
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MenPage);

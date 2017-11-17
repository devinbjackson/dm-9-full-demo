import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import DemoCarousel from "../DemoCarousel/DemoCarousel"

import './AccPage.css';

class AccPage extends Component {
  constructor(props) {
    super(props)
    this.state ={
      list: []
  }

}

componentDidMount(){
  axios.get(`/api/departments/ACCESSORIES`)
  .then(response =>{ 
  this.setState({list: response.data})

  })

}
render() {
  const list = 
  
  this.state.list.map(function(item){
  return (<Link to={`/details/${item.product_id}`}><div className="list-item">
         <div className="list-image" style={{backgroundImage: `url(${item.image_url})`}}>
         </div>
         {item.name}
         </div>
         </Link>)
 })
  return (
      <div className="accPage-whole">
      <div className="page-image" style={{backgroundImage: `url(https://i.pinimg.com/originals/3a/7a/69/3a7a69fb1b6b19e588e93cce0ab5f058.jpg)`}}></div>
      
      <div className="filler-list"> {list}</div>
      
      
    </div>
  );
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AccPage);

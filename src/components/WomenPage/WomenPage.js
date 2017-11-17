import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import DemoCarousel from "../DemoCarousel/DemoCarousel"

import './WomenPage.css';

class WomenPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
        list: []
    }

  }

  componentDidMount(){
    axios.get(`/api/departments/WOMEN`)
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
      <div className="womenPage-whole">
        <div className="page-image" style={{backgroundImage: `url(https://i.pinimg.com/originals/ed/d2/21/edd221d4a62186dbcd1e3c97a2f411b6.jpg)`}}></div>
        
        <div className="filler-list"> {list}</div>
        
        
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(WomenPage);

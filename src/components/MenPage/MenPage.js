import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import DemoCarousel from "../DemoCarousel/DemoCarousel"

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
     console.log(response)
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
        <div className="menPage-whole">
        <div className="menPage-image" style={{backgroundImage: `url(https://jordanandeddie.files.wordpress.com/2015/09/matthew-post.jpg)`}}></div>
        
        <div className="filler-list"> {list}</div>
        
        
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MenPage);

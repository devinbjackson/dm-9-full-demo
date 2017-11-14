import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";

import './FillerCard.css';

class FillerCard extends Component {
    constructor(props) {
        super(props);
        
        this.state ={
            list: []
        }

      }

      componentDidMount(){
        axios.get(`/api/departments/filler/${this.props.name}`)
        .then(response =>{ 
        this.setState({list: response.data})
         console.log(response)
        })
      
      }

    render() {
         const list = 
         
         this.state.list.map(function(item){
         return (<Link to={`/details/${item.product_id}`}>
          <div className="list-item">
           <div className="list-image" style={{backgroundImage: `url(${item.image_url})`}}>
           </div>
           {item.name}
           </div>
           </Link>)
        })

        return (
           <div className="filler-whole">
               <div>{this.props.name}
               </div>
              <div className="filler-list"> {list}</div>

            <Link to={`/${this.props.name}`}><button>SEE {this.props.name}</button></Link>
           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(FillerCard);
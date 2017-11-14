import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";

import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        
        this.state ={
            product: []
        }

      }

      componentDidMount(){
        axios.get(`/api/details/${this.props.name}`)
        .then(response =>{ 
        this.setState({list: response.data})
         console.log(response)
        })
      
      }

    render() {

        return (
           <div className="details-whole">
              <div className="detailsCard">
              {this.state.product}
              </div>

           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(Details);
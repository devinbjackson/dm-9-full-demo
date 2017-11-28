import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import FlatButton from 'material-ui/FlatButton';

import './FillerCard.css';
import { relative } from 'path';

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
        })
      
      }

    render() {
         const list = 
         
         this.state.list.map(function(item){
         return (<Link to={`/details/${item.product_id}`}>
          <div className="list-item">
           <div className="list-image" style={{backgroundImage: `url(${item.image_url})`}}>
           </div>
           <div className="filler_image_name">
           {item.name}
           </div>
           </div>
           </Link> )
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
                    
                     <div className="filler-list"> {list} </div>
                    

            <Link to={`/${this.props.name}`}>
            <div className="bordered"><FlatButton label={` SEE ${this.props.name}`} /></div>
            </Link>
           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(FillerCard);
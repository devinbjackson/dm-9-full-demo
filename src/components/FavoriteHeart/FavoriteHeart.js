import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


import { requestUser, addToFaves , removeFromFaves, refreshFaves } from '../../ducks/reducer';
import './FavoriteHeart.css';


class FavoriteHeart extends Component {
    //      console.log(response.data[0])
    constructor(props) {
        super(props);

        this.state={
            solid: false,
            open: false,
            logged: false
        }
        
        this.handleClick = this.handleClick.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);
      }

      componentDidMount(){
        this.props.refreshFaves()  
        const guy = (this.props.user.authid? true:false);

        const faved = (this.props.faves.includes(this.props.product.product_id) ? true:false);

        console.log("this.props.pID",this.props.product.product_id)    
        console.log(
        "product id from state", 
        this.props.product.product_id,
        "and faves", this.props.faves)

        this.setState({logged: guy,
        solid: faved
        })

      }

      handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };
    
      handleCloseLogin = () => {
        this.setState({open: false});
        window.location.href = "http://localhost:3001/login";
      };

      handleClick(){
        const id = this.props.product.product_id

            if(!this.state.logged){
              this.handleOpen()
            }   
                else {
                    if(this.state.solid){
                    this.props.removeFromFaves(id),
                    (this.setState({solid: false}))
                    }
                    else {
                         this.props.addToFaves(id),
                         (this.setState({solid: true}))
                         }
                }
      }

    render() {

        // console.log(this.state.product)
        //const item = this.state.product ? this.state.product : "";
        const solid = this.props.faves?this.props.faves.includes(this.props.product.product_id):0;
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Login"
              primary={true}
              onClick={this.handleCloseLogin}

            />,
          ];

        return (
           <div onClick={()=>this.handleClick()} className="favorite-heart-whole">

                {solid?
                <i class={`fa fa-heart fa-lg ${solid? 'liked':''}`} aria-hidden="true" ></i>
                :
                <i class="fa fa-heart-o fa-lg" aria-hidden="true"></i>
                }


                <Dialog
                title="Please Login to Favorite"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                >
                Glad you like the item! Login to keep track of favorites!
                </Dialog>

           </div> 
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps, {requestUser, addToFaves, removeFromFaves, refreshFaves})(FavoriteHeart);
import React, { Component } from "react";
import axios from "axios";
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';

import cart_img from "./cart-logo.svg";
import router from "../../router";
import "./App.css";
import NavBar from '../NavBar/NavBar';
import PreFooter from '../PreFooter/PreFooter'
import Footer from '../Footer/Footer';
import UserPage from '../UserPage/UserPage';


class App extends Component {


  render() {
    
    return (<div className="App">
      <NavBar /> 
              {router}
              <UserPage/>
      <PreFooter/>
      <Footer/>
    </div>
  )
  }
}

export default App;
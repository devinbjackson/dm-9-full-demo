import React, { Component } from "react";
import axios from "axios";
import AppBar from 'material-ui/AppBar';
import MediaQuery from 'react-responsive';
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
import { EditorDragHandle } from "material-ui/svg-icons/editor/drag-handle";

class App extends Component {


  render() {
    
    return (<div className="App">
      <MediaQuery query="(min-device-width: 600px)">
         <NavBar />
      </MediaQuery>  
    {router}
    <PreFooter/>
        <Footer/>
    </div>
  )
  }
}

export default App;
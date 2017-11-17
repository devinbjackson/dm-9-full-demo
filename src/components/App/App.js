import React, { Component } from "react";
import axios from "axios";

import router from "../../router";
import "./App.css";
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import CartDisplay from '../CartDisplay/CartDisplay'

class App extends Component {

  render() {
    return <div className="App">
    <NavBar/>
    {router}
    <Footer/>
    <CartDisplay/>
    </div>;
  }
}

export default App;

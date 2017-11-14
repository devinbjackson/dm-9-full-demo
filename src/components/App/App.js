import React, { Component } from "react";
import axios from "axios";

import router from "../../router";
import "./App.css";
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

class App extends Component {
  componentDidMount() {
    // axios.get("/api/test").then(response => {
    //   console.log(response);
    // });
  }
  render() {
    return <div className="App">
    <NavBar/>
    {router}
    <Footer/>
    
    </div>;
  }
}

export default App;

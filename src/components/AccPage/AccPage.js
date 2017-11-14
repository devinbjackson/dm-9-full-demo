import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import DemoCarousel from "../DemoCarousel/DemoCarousel"

import './AccPage.css';

class AccPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // axios.get("/api/me").then(response => {
    //   if (!response.data) this.setState({ user: null });
    //   else this.setState({ user: response.data });
    // });
    // this.props.requestUser();
  }
  render() {
    return (
      <div className="landing-whole">
        <DemoCarousel/>
        ACCESSORIES PAGE
        
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AccPage);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import SubHeader from '.././SubHeader/SubHeader'
import DemoCarousel from "../DemoCarousel/DemoCarousel"
import FillerCard from '../FillerCard/FillerCard';
import { requestUser } from "../../ducks/reducer";
import './LandingPage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // axios.get("/api/me").then(response => {
    //    if (!response.data) this.setState({ user: null });
    //    else this.setState({ user: response.data });
    //  });
     this.props.requestUser();
  }
  render() {
    return (
      <div className="landing-whole">
        <DemoCarousel className="hundovh"/>
        <SubHeader/>
        
          {this.props.user.name && (
            <div>
              {this.props.user.name} & {this.props.user.authid}
            </div>
          )}
          <div className="section-line"></div>    
          <FillerCard name="MEN"/>
          <div className="section-line"></div>  
          <FillerCard name="WOMEN"/>
          <div className="section-line"></div>  
          <FillerCard name="ACCESSORIES"/>
          <div className="section-line"></div> 
      </div>
    );
  }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps, { requestUser })(LandingPage);

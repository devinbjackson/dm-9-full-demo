import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Checkout from '../../Checkout'
import './CheckoutView.css';

class CheckoutView extends Component {
    constructor(props) {
        super(props);
    this.state ={
        firstName: '',
        lastName: '',
        streetAddress: '',
        apt: '',
        city: '',
        stateName: '',
        zip: '',
        firstNameError: '',
        lastNameError: '',
        streetAddressError: '',
        cityError: '',
        stateNameError: '',
        zipError: '',
        paying: false
    }
    this.change = this.change.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
}
    
    onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    const err = this.validate();
    if(!err){
    this.setState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        apt: '',
        city: '',
        stateName: '',
        zip: '',
        firstNameError: '',
        lastNameError: '',
        streetAddressError: '',
        cityError: '',
        stateNameError: '',
        zipError: '',
        paying: false
    });
  }
}

    validate = () => {
        let isError = false;
        const errors = {
            firstNameError: '',
            lastNameError: '',
            streetAddressError: '',
            cityError: '',
            stateNameError: '',
            zipError: '',
        };
        if (this.state.firstName.length < 1) {
            isError = true;
            errors.firstNameError = "Please enter first name";
          }
      
        if (this.state.firstName.length < 1) {
            isError = true;
            errors.lastNameError = "Please enter last name";
          }
          if (this.state.streetAddress.length < 5) {
            isError = true;
            errors.streetAddressError = "Please enter street address";
          }
          if (this.state.firstName.length < 3) {
            isError = true;
            errors.cityError = "Please enter city";
          }
          if (this.state.firstName.length < 1) {
            isError = true;
            errors.firstNameError = "Please enter last name";
          }
          if (this.state.stateName.length < 3) {
            isError = true;
            errors.stateNameError = "Please select state";
          }
          if (this.state.zip.length < 5) {
            isError = true;
            errors.zipError = "Please enter zip code";
          }
      
          this.setState({
            ...this.state,
            ...errors
          });
      
          return isError;
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleChange = (event, index, stateName) => {
        this.setState({stateName});
      };

    render() {

        const stateList =  
        ["Alaska",
        "Alabama",
        "Arkansas",
        "American Samoa",
        "Arizona",
        "California",
        "Colorado",
        "Connecticut",
        "District of Columbia",
        "Delaware",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Iowa",
        "Idaho",
        "Illinois",
        "Indiana",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Massachusetts",
        "Maryland",
        "Maine",
        "Michigan",
        "Minnesota",
        "Missouri",
        "Mississippi",
        "Montana",
        "North Carolina",
        "North Dakota",
        "Nebraska",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "Nevada",
        "New York",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Virginia",
        "Virgin Islands",
        "Vermont",
        "Washington",
        "Wisconsin",
        "West Virginia",
        "Wyoming"]

        const items = [];
        for (let i = 0; i < stateList.length; i++ ) {
          items.push(<MenuItem value={stateList[i]} key={i} primaryText={`${stateList[i]}`} />);
        }
        const total = this.props.cart.length ? this.props.cart.reduce(function(acc, item){
            
            return acc + parseFloat(item.price);

        }, 0):0;

        return(
            <div id="checkout_view_whole">
      <form>
        <TextField
      name="firstName"
      floatingLabelText="First Name"
      value={this.state.firstName}
      onChange={e =>this.change(e)}
      floatingLabelFixed={true}
      errorText={this.state.firstNameError}
        />
        <TextField
        name="lastName"
      floatingLabelText="Last Name"
      value={this.state.lastName}
      onChange={e =>this.change(e)}
      floatingLabelFixed={true}
      errorText={this.state.lastNameError}
        />
        <TextField
        name="streetAddress"
      floatingLabelText="Street Address"
      value={this.state.streetAddress}
      onChange={e =>this.change(e)}
      floatingLabelFixed={true}
      errorText={this.state.streetAddressError}
        />
        <TextField
        name="apt"
      floatingLabelText="Apt, suite, unit etc. (optional)"
      value={this.state.apt}
      onChange={e =>this.change(e)}
      floatingLabelFixed={true}
      
        />
        <TextField
        name="city"
      floatingLabelText="City"
      value={this.state.city}
      onChange={e =>this.change(e)}
      floatingLabelFixed={true}
      errorText={this.state.cityError}
        />
        
        <TextField
        name="zip"
      floatingLabelText="ZIP"
      value={this.state.zip}
      onChange={e =>this.change(e)}
      floatingLabelFixed={true}
      errorText={this.state.zipError}
        />
        <SelectField
        name="stateName"
        floatingLabelText="State"
        value={this.state.stateName}
        onChange={this.handleChange}
        maxHeight={200}
        floatingLabelFixed={true}
        errorText={this.state.stateNameError}
      >
      {items}
      </SelectField>
        <RaisedButton label="PLACE ORDER" onClick={e => this.onSubmit(e)} primary />
          </form>
          <Checkout
            name={'Payment'}
            description={'Powered By Stripe'}
            amount={total}
           /> 
          </div>
      
        );
    }
};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(CheckoutView);
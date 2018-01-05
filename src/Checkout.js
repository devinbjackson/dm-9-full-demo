import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { destroyCart, refreshCart } from './ducks/reducer';
import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

// const fromDollarToCent = amount => parseFloat((amount * 100).toFixed(0));

// const successPayment = data => {
//   alert('Payment Successful');
//   axios.get("http://localhost:3001/api/paySuccess").then(response => history.push("/"));
// };

// const errorPayment = data => {
//   alert('Payment Error');
// };

// const onToken = (amount, description) => token =>
//   axios.post(PAYMENT_SERVER_URL,
//     {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromDollarToCent(amount)
//     })
//     .then(successPayment)
//     .catch(errorPayment);

// const Checkout = ({ name, description, amount , history}) => {
//   return <StripeCheckout
//     name={name}
//     description={description}
//     amount={fromDollarToCent(amount)}
//     token={onToken(amount, description)}
//     currency={CURRENCY}
//     stripeKey={STRIPE_PUBLISHABLE}
//   />

//   }

  class Checkout extends Component {

    constructor(props) {
      super(props);

      this.successPayment = this.successPayment.bind(this);
      this.onToken = this.onToken.bind(this);
    }

    fromDollarToCent(amount) {
      var num = parseInt((amount * 100).toFixed(0), 10);

      console.log(num)
      return num;
    } 
    onToken(token) {
      axios.post(PAYMENT_SERVER_URL,
        {
          description: this.props.description,
          source: token.id,
          currency: CURRENCY,
          amount: this.fromDollarToCent(this.props.amount)
        })
        .then(this.successPayment)
        .catch(this.errorPayment);
      }

    successPayment(data) {
      // console.log(this);
      window.alert('Payment Successful');
      this.props.destroyCart()
      window.location.href="/api/paySuccess";
    };

    errorPayment(data) {
      window.alert('Payment Error', data);
    };
    
    render() {
      const {
        name,
        description,
        amount
      } = this.props;
      return (<StripeCheckout
        name={name}
        description={description}
        amount={this.fromDollarToCent(amount)}
        token={this.onToken}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      />)
    }
  }

const mapStateToProps = state => state;

export default connect(mapStateToProps, {destroyCart, refreshCart})(withRouter(Checkout));
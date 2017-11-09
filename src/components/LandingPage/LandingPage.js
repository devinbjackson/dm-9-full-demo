import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { requestUser } from "../../ducks/reducer";

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // axios.get("/api/me").then(response => {
    //   if (!response.data) this.setState({ user: null });
    //   else this.setState({ user: response.data });
    // });
    this.props.requestUser();
  }
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Link to="/login">
          <button>Login</button>
          {this.props.user.name && (
            <div>
              {this.props.user.name} & {this.props.user.authid}
            </div>
          )}
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser })(LandingPage);

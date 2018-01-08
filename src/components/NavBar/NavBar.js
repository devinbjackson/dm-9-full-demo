import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from 'material-ui/IconButton'
import Badge from "material-ui/Badge";
import AppBar from 'material-ui/AppBar';

import logo from './DJLogo.png';
import cart_img from "./cart-logo.svg";
import { requestUser, refreshCart, removeFromCart } from "../../ducks/reducer";

import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.state = { leftOpen: false ,
    rightOpen: false ,
    guy: ''};

    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRightToggle = this.handleRightToggle.bind(this)
    this.comboCloseLogin = this.comboCloseLogin.bind(this)
  }

  handleToggle = () => this.setState({ rightOpen: !this.state.rightOpen });

  handleClose = () => {this.setState({ leftOpen: false ,rightOpen: false})};

  handleLogin() {
    window.location.href = "/login";
  }

  handleRightToggle() {
    this.setState({rightOpen: this.state.rightOpen})
  } 

  componentDidMount() {
    // axios.get("/api/me").then(response => {
    //    if (!response.data) this.setState({ user: null });
    //    else this.setState({ user: response.data });
    //  });
    this.props.requestUser();
    this.props.refreshCart();
    this.setState({ rightOpen: false,
                    leftOpen: false });
  }
  
  handleLogout() {
    window.location.href = "/logout";
  }

  comboCloseLogin() {
    this.handleClose();
    (this.state.guy? this.handleLogout() : this.handleLogin())
   }

  render() {
    const total = this.props.cart.length ? this.props.cart.reduce(function(acc, item){
      
    return acc + parseFloat(item.price);

    }, 0).toFixed(2):0;
    const guy = this.props.user.authid;
    if(this.state.guy !== guy){
      this.setState({guy})
    }

    const logInText = function() {
      if (guy) {
        return "LOG OUT";
      } else {
        return "LOG IN";
      }
    };
    const cartNumber = this.props.cart.length ? this.props.cart.length : "";
    const items = [];
    for (let i = 0; i < this.props.cart.length; i++) {
      items.push(



       //ITEMS TO GO IN THE CART DISPLAY



        <MenuItem
          className="cart-drawer"
          value={this.props.cart[i].product_id}
          key={i}
        >
          <Link to={`/details/${this.props.cart[i].product_id}`}>
            <div className="sides">
              <div className="left-side">
                <img
                  style={{ width: "80px", height: "90px" }}
                  src={`${this.props.cart[i].image_url}`}
                />
              </div>
              <div
                className="right-side"
                style={{
                  display: "flex",
                  flexDirection: "column"

                }}
              >
                <div>{`${this.props.cart[i].name}`}</div>
                <div>{`$${this.props.cart[i].price}`}</div>
                
              </div>
            </div>
          </Link>
          <RaisedButton
                onClick={()=>{console.log('removing item with id ', this.props.cart[i]),this.props.removeFromCart(this.props.cart[i].product_id)}}
                primary
                label="REMOVE"
                fullWidth={false}
              />
        </MenuItem>




      );
    }
    return (
      <div className='navBar-whole'>
      <div className='nav-whole'>
      
        <Link to="/">
          <div className="nav-logo">
            <img
              style={{ width: "100px" }}
              src={logo}
            />
          </div>
          
        </Link>
        <Link to="/men">
          <div className="nav-men">MEN</div>
        </Link>
        <Link to="/women">
          <div className="nav-women">WOMEN</div>
        </Link>
        <Link to="/accessories">
          <div className="nav-acc">ACCESSORIES</div>
        </Link>

        {this.props.user.authid?
        <Link to="/userpage">
          <div className="nav-account">ACCOUNT</div>
        </Link>
        :''}

      { cartNumber ?
        <div className="nav-signIn-cart">
          {this.props.user.name}

          <a onClick={ this.props.user.authid ? this.handleLogout : this.handleLogin}>
            {logInText()}
          </a> 


          {cartNumber ? (
            <a>
              <Badge id="cart-badge" badgeContent={cartNumber} primary={true}>
                <img src={cart_img} onClick={this.handleToggle} />
              </Badge>
            </a>
          ) : (
            <a>
              <img id="just-cart" src={cart_img} onClick={this.handleToggle} />
            </a>
          )}
        </div>
        : 
        <div className="nav-signIn-cart" id="nav-signIn-noBadge">
        {this.props.user.name}

        <a onClick={ this.props.user.authid ? this.handleLogout : this.handleLogin}>
          {logInText()}
        </a> 


        {cartNumber ? (
          <a>
            <Badge id="cart-badge" badgeContent={cartNumber} primary={true}>
              <img src={cart_img} onClick={this.handleToggle} />
            </Badge>
          </a>
        ) : (
          <a>
            <img id="just-cart" src={cart_img} onClick={this.handleToggle} />
          </a>
        )}
      </div>

      }




        {/* -------------------------------------------------- */}
        <Drawer 
          containerStyle={{backgroundColor: "grey"}}
          docked={false}
          width={400}
          openSecondary={true}
          open={this.state.rightOpen}
          onRequestChange={open => this.setState({rightOpen: open})}
          
        >
          {this.props.cart.length ? items : 
          <MenuItem style={{
            height:'100vh',
            fontSize: '3em',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            width: '400px',
            justifyContent: 'center',
            alignContent: 'center',
            flexWrap: 'wrap' }} onClick={this.handleClose}><div>YOUR</div><div>CART</div><div>IS</div><div>EMPTY</div></MenuItem>
          }
          
          {this.props.cart.length ? (
            <Link to="/checkout">
              {" "}
              <RaisedButton
                style={{bottom: 0, left: 0,position: 'absolute'}}
                onClick={this.handleClose}
                primary
                label={`$${total} - CHECK OUT`}
                fullWidth={true}
              />
            </Link>
          ) : (
            ''
          )}
        </Drawer>
        
      </div>
      <div className="small-nav">


        <AppBar
        title="- DJ -"
        onLeftIconButtonTouchTap={()=> this.setState({leftOpen: true})}
      
        iconElementRight={<IconButton><img id="just-cart" src={cart_img} onClick={this.handleToggle} /></IconButton>}
        />

        
        <Drawer
          docked={false}
          width={'100%'}
          open={this.state.leftOpen}
          containerStyle={{display: 'flex', flexDirection: 'column',color:'white', justifyContent: 'space-between', backgroundColor:'grey'}}
        > 
          <div className="section-line-red"></div> 
          <Link to="/"><MenuItem className="menu-left-item " onClick={this.handleClose}>HOME</MenuItem></Link>
          <div className="section-line-red"></div> 
          <Link to="/men"><MenuItem className="menu-left-item " onClick={this.handleClose}>MEN</MenuItem></Link>
          <div className="section-line-red"></div> 
          <Link to="/women"><MenuItem className="menu-left-item " onClick={this.handleClose}>WOMEN</MenuItem></Link>
          <div className="section-line-red"></div> 
          <Link to="/accessories"><MenuItem className="menu-left-item  " onClick={this.handleClose}>ACCESSORIES</MenuItem></Link>
          <div className="section-line-red"></div>
          {this.props.user.authid?
          <Link to="/userpage"><MenuItem className="menu-left-item " onClick={this.handleClose}>ACCOUNT</MenuItem></Link>:<MenuItem className="menu-left-item " onClick={this.comboCloseLogin}>{logInText()}</MenuItem>}
          {this.props.user.authid?
          <div className="section-line-red"></div>:''}
          {this.props.user.authid?  
          <MenuItem className="menu-left-item " onClick={this.comboCloseLogin}>{logInText()}</MenuItem>:''}
          
          <div className="section-line-red"></div> 


          <MenuItem className="menu-left-item back-item" onClick={this.handleClose}><i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i>{`  BACK`}</MenuItem>
          <div className="section-line-red "></div> 
        </Drawer>

        <Drawer 
          containerStyle={{backgroundColor: "grey"}}
          docked={false}
          width={'100%'}
          openSecondary={true}
          open={this.state.rightOpen}
          onRequestChange={open => this.setState({rightOpen: open})}
        >
          {this.props.cart.length ? items : 
          <MenuItem style={{
            height:'100vh',
            fontSize: '3em',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            width: '100vw',
            justifyContent: 'center',
            alignContent: 'center',
            flexWrap: 'wrap' }} onClick={this.handleClose}><div>YOUR</div><div>CART</div><div>IS</div><div>EMPTY</div></MenuItem>
          }
          
          {this.props.cart.length ? (
            <Link to="/checkout">
              {" "}
              <RaisedButton
                style={{bottom: 0, position: 'absolute'}}
                onClick={this.handleClose}
                primary
                label={`$${total} - CHECK OUT`}
                fullWidth={true}
              />
            </Link>
          ) : (
            ''
          )}
        </Drawer>

      </div>
    </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { requestUser, refreshCart, removeFromCart })(NavBar);

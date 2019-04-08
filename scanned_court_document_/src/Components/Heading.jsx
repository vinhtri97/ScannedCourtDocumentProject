import React, { Component } from 'react';
import './Heading.css'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

class Heading extends Component {
    logOutBtnHandler = () => {
      localStorage.removeItem('token');
      this.props.onLoggedinChange(null);
      this.props.history.replace('/home')
    }
    render() { 
      return(
          <header className="border-bottom d-block">
            <div className="container">
              <nav className="navbar navbar-expand-sm navbar-light">
                <img src={teamLogoImg} className="navbar-brand"></img>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item"><Link to='/home' className="nav-link">Home</Link></li>
                  <li className="nav-item"><Link to='/document/all' className="nav-link">Document</Link></li>
                  <li className="nav-item"><Link to='/about-us' className="nav-link">About us</Link></li>
                  <li className="nav-item nav-link">|</li>
                  {
                    this.props.isLoggedIn ?
                    (
                      <div className="nav-item">
                        <li className="d-inline-block"><Link to='/user_option' className="nav-link">{this.props.username}</Link></li>
                        <li className="d-inline-block" style={style.logoutBtn}><button className="btn default" onClick={this.logOutBtnHandler}>Log out</button></li>
                     </div>
                    ) : (
                      <div className="nav-item">
                        <li className="d-inline-block"><Link to='/signup' className="nav-link">Sign up</Link></li>
                        <li className="d-inline-block"><Link to='/login' className="nav-link">Log in</Link></li>
                     </div>
                    )
                  }
                </ul>
              </nav>
            </div>  
          </header>
      );
    }
}
const style ={
  logoutBtn:{
    "border": "none",
    "background-color": "inherit"
  }
}
const teamLogoImg = require('../Resources/court-logo.png');
export default withRouter(Heading);
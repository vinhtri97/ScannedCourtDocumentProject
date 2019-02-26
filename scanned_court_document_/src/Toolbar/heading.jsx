import React, { Component } from 'react';
import './heading.css'


class Heading extends Component {
    render() { 
      return(
          <header className="border-bottom d-block">
            <div className="container">
              <nav className="navbar navbar-expand-sm navbar-light">
                <img src={teamLogoImg} className="navbar-brand"></img>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                  <li className="nav-item"><a href="/" className="nav-link">Document</a></li>
                  <li className="nav-item"><a href="/" className="nav-link">About us</a></li>
                  <li className="nav-item nav-link">|</li>
                  <li className="nav-item"><a href="/" className="nav-link">Sign up</a></li>
                  <li className="nav-item"><a href="/" className="nav-link">Log in</a></li>
                </ul>
              </nav>
            </div>  
          </header>
      );
    }
}
const teamLogoImg = require('../Resources/court-logo.png');
export default Heading;
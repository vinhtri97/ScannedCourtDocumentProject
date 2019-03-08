import React, { Component } from 'react';
import './Heading.css'
import { Link } from 'react-router-dom'


class Heading extends Component {
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
                  <li className="nav-item"><Link to='/signup' className="nav-link">Sign up</Link></li>
                  <li className="nav-item"><Link to='/login' className="nav-link">Log in</Link></li>
                </ul>
              </nav>
            </div>  
          </header>
      );
    }
}
const teamLogoImg = require('../Resources/court-logo.png');
export default Heading;
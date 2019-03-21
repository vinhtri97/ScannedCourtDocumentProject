import React, { Component } from 'react';
import './App.css';
import Heading from './Components/Heading'
import Homepage from './WebPages/Homepage';
import DocumentPage from './WebPages/DocumentPage'
import AboutUsPage from './WebPages/AboutUsPage'
import SignupPage from './WebPages/SignupPage';
import LoginPage from './WebPages/LoginPage';
import { Switch, Route } from 'react-router-dom'
import UserOptionPage from './WebPages/UserOptionPage'
import PrivateRoute from './Components/PrivateRoute';
class App extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <Heading />
        <Switch>
          <Route exact path='/' component={Homepage}></Route>
          <Route path='/home' component={Homepage}></Route>
          <Route path='/document/all' component={DocumentPage}></Route>
          <Route path='/about-us' component={AboutUsPage}></Route>
          <Route path='/login' component={LoginPage}></Route>
          <Route path='/signup' component={SignupPage}></Route>
          <PrivateRoute path='/user_option' component={UserOptionPage}></PrivateRoute>
        </Switch>
        <div className="footer-copyright text-center py-3" style={footerStyle}>© 2019 Copyright:
          <a href="/"> Capstone Project</a>
        </div>
      </div>
    );
  }
}
const footerStyle = {
   bottom:'0',
   width:'100%',
   height:'60px',
}

const containerStyle = {
  'min-height':'100%',
  position:'relative'
}

export default App;

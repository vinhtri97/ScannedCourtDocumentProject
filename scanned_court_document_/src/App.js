import React, { Component } from 'react';
import './App.css';
import Heading from './Components/Heading'
import Homepage from './WebPages/Homepage';
import DocumentPage from './WebPages/DocumentPage'
import AboutUsPage from './WebPages/AboutUsPage'
import SignupPage from './WebPages/SignupPage';
import LoginPage from './WebPages/LoginPage';
import { Switch, Route } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div>
        <Heading />
        <Switch>
          <Route exact path='/' component={Homepage}></Route>
          <Route path='/home' component={Homepage}></Route>
          <Route path='/document/all' component={DocumentPage}></Route>
          <Route path='/about-us' component={AboutUsPage}></Route>
          <Route path='/login' component={LoginPage}></Route>
          <Route path='/signup' component={SignupPage}></Route>
        </Switch>
        <div className="footer-copyright text-center py-3">© 2019 Copyright:
                    <a href="/"> Capstone Project</a>
        </div>
      </div>
    );
  }
}

export default App;

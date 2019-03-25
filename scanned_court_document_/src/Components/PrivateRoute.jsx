import React, { Component } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom'


const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}
class PrivateRoute extends Component {
  render() { 
    var {component:Component,...rest } = this.props;
    return ( 
      <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
     );
  }
}
 
export default PrivateRoute;
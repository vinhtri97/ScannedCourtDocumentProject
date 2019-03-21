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
  state = { component:this.Component,...this.rest } = this.props;
  render() { 
    return ( 
      <Route {...this.state.rest} render={(props) => (
        fakeAuth.isAuthenticated === true
          ? <this.Component {...props} />
          : <Redirect to='/login' />
      )} />
     );
  }
}
 
export default PrivateRoute;
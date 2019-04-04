import React, { Component } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom'



class PrivateRoute extends Component {
  isLoggedin = () =>{
    var token = localStorage.getItem('token');
    console.log("gohere");
    if (token)
      return true;
    return false;
  }
  render() { 
    var {component:Component,...rest } = this.props;
    return ( 
      <Route {...rest} render={(props) => (
        this.isLoggedin()
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
     );
  }
}
 
export default PrivateRoute;
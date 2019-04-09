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
import UpLoadDocumentPage from './WebPages/UploadDocumentPage';
import ManualUploadPage from './WebPages/ManualUploadPage';
import SearchPage from './WebPages/SearchPage';

var jwt = require('jsonwebtoken');
class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoggedIn:false,
      username:null
    }
  }
  componentDidMount(){
    var token = localStorage.getItem('token');
    this.setUserStatus(token);
  }
  setUserStatus = (token) =>{
    if (token){
      var decoded = jwt.verify(token,'shhhhh');
      this.setState({
        isLoggedIn:true,
        username:decoded.user
      })
    }
    else{
      this.setState({
        isLoggedIn:false,
        username:null
      })
    }
  }
  render() {
    return (
      <div style={containerStyle}>
        <Heading isLoggedIn={this.state.isLoggedIn} username={this.state.username} onLoggedinChange={this.setUserStatus}/>
        <Switch>
          <Route exact path='/' component={Homepage}></Route>
          <Route path='/home' component={Homepage}></Route>
          <Route path='/document/all' component={DocumentPage}></Route>
          <Route path='/about-us' component={AboutUsPage}></Route>
          <Route path='/search/:query' component={SearchPage}></Route>
          <Route 
            path='/login'  
            render={(routerProps) => <LoginPage {...routerProps} onLoggedinChange={this.setUserStatus} />}
          ></Route>
          <Route path='/signup' component={SignupPage}></Route>
          <PrivateRoute path='/user_option' component={UserOptionPage}></PrivateRoute>
          <PrivateRoute path='/upload_document' component={UpLoadDocumentPage}></PrivateRoute>
          <PrivateRoute path='/manual_upload' component={ManualUploadPage}></PrivateRoute>
        </Switch>
        <div className="footer-copyright text-center py-3" style={footerStyle}>© 2019 Copyright:
          <a href="/about-us"> Capstone Project</a>
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

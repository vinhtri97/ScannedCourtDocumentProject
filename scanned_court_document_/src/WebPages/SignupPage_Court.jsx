import React, { Component } from 'react';
import "./Signup.css";
class SignupPage extends Component {
    state = {
        username: "",
        password: ""
    }
    signup = (event) =>
    {
        event.preventDefault();
        console.log(this.state);
        
        fetch('/signup', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)         
        })
        .then(response => {
            console.log(response.status);
            if (response.status == 404){
                alert("Invalid username or password");
                event.preventDefault();
            }
            else if (response.state = 200){
                console.log("okkkk");
            }
        })
    }
    userNameOnchangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    passwordOnchangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    render() { 
        return ( 
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h1 class="text-center">Signup</h1>
                        <div class="d-flex justify-content-center">
                            <div class="card mt-3">
                                <div class="card-body">
                                    <form onSubmit={this.signup}>
                                        <div class="form-group">
                                            <label>Username</label>
                                            <input onChange={this.userNameOnchangeHandler} type="text" id="username" class="form-control" name="username" placeholder="Enter username"  value={this.state.username}/>
                                        </div>
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input onChange={this.passwordOnchangeHandler} type="text" id="password" class="form-control" name="password" placeholder="Enter password" required value={this.state.password}/>
                                        </div>
                                        <input type="submit" class="btn btn-primary" value="Submit"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
} 
 
export default SignupPage;
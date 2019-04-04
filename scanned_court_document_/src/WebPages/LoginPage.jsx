import React, { Component } from 'react';
import './LoginPage.css'
class LoginPage extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            username:"",
            password:""
        }
    }
    handleOnChange(event){
        this.setState({ [event.target.name]: event.target.value });
        event.preventDefault();
    }
    handleSubmit(event){
        if ((this.state.username == "") || (this.state.password == "")){
            alert("not full filled");
            event.preventDefault();
        }
        else 
            fetch('/login', {
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
                else{
                    response.json()            
                    .then(token => {
                        console.log(this.props);
                        localStorage.setItem('token',token);
                        this.props.onLoggedinChange(token);
                        this.props.history.push("/user_option");
                    })
                }
            })
            event.preventDefault();
    }
    render() { 
        return ( 
                <div id="formContent" onSubmit={this.handleSubmit}>
                    <form>
                        <input type="text" id="login" class="fadeIn loginTextInput" name="username" placeholder="Username" onChange={this.handleOnChange} />
                        <input type="password" id="password" class="fadeIn loginTextInput" name="password" placeholder="Password" onChange={this.handleOnChange} />
                        <input type="submit" class="fadeIn loginSubmitInput" value="Log In" />
                    </form>

                    <div id="formFooter">
                        <a class="underlineHover fadeIn" href="#">Forgot Password?</a>
                    </div>

                </div>
         );
    }
} 
 
export default LoginPage;
import React, { Component } from 'react';
import './LoginPage.css'
class LoginPage extends Component {
    render() { 
        return ( 
                <div id="formContent">
                    <form>
                    <input type="text" id="login" class="fadeIn loginTextInput" name="login" placeholder="Username" />
                    <input type="text" id="password" class="fadeIn loginTextInput" name="login" placeholder="Password" />
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
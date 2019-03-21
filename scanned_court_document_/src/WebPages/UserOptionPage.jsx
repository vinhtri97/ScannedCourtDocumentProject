import React, { Component } from 'react';
class UserOptionPage extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    render() { 
        return ( 
            <div className="container" style={container_styles}>
                <div className="row justify-content-center" style={row_styles}>
                    <button className="btn btn-primary mt-auto btn-secondary" style={btn_styles}>
                        Markup Documents
                    </button>
                </div>
                <div className="row justify-content-center" style={row_styles}>
                    <button className="btn btn-primary mt-4 btn-secondary" style={btn_styles}>
                        Upload Document
                    </button>
                </div>
            </div>
         );
    }
}
const container_styles ={
    "padding-top": "7%"
}
const row_styles = {
    height:"100px",
    
}
const btn_styles = {
    "width" : "30%",
    "height" : "60%"
}
 
export default UserOptionPage;
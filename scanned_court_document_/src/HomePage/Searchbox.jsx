import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
class SearchBox extends Component {
    render() { 
        return (  
            <div className="d-block">
                <form className="form-inline justify-content-center mt-5">
                    <i className="fa fa-search h2"></i>
                    <input type="text" className="form-control w-75" placeholder="Search topics or keywords"></input>
                    <button className="btn btn-primary bg-dark">Search</button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;
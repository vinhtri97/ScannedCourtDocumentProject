import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { withRouter } from 'react-router-dom';
class SearchBox extends Component {
    state = {
        query:this.props.query
    }
    onSubmitHandler = (e) =>{
        this.props.history.push(`/search/${this.state.query}`);
    }
    handleChange = (e) => {
        this.setState({
            query:e.target.value
        });
    }
    render() { 
        return (  
            <div className="d-block" onSubmit>
                <div className="form-inline justify-content-center mt-5" >
                    <i className="fa fa-search h2"></i>
                    <input type="text" className="form-control w-75" placeholder="Search topics or keywords" value={this.state.query} onChange={this.handleChange}></input>
                    <button type="submit" className="btn btn-primary bg-dark" onClick={this.onSubmitHandler}>Search</button>
                </div>
            </div>
        );
    }
}
 
export default withRouter(SearchBox);
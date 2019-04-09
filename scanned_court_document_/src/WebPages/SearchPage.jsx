import React, { Component } from 'react';
import { throws } from 'assert';
import DocumentSection from '../Components/DocumentSection';
import SearchBox from '../Components/Searchbox';
class SearchPage extends Component {
    state = { 
        //query:this.props.location.state.query
        query:this.props.match.params.query
    }
    componentDidUpdate(){
        if (this.props.match.params.query != this.state.query)
            this.setState({
                query:this.props.match.params.query
            })
    }
    render() { 
        //console.log(this.state.query);
        return ( 
            <div>
                <SearchBox query={this.state.query}/>
                <DocumentSection name="Search Result"></DocumentSection>
            </div>
         );
    }
}
 
export default SearchPage;
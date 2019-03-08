import React, { Component } from 'react';
import DocumentSection from '../Components/DocumentSection';
import SearchBox from '../Components/Searchbox';
class Homepage extends Component {
    render() { 
        return (  
            <div className="d-block"> 
                <SearchBox />
                <DocumentSection name= "Recently Document"/>
            </div>
        );
    }
}
 
export default Homepage;
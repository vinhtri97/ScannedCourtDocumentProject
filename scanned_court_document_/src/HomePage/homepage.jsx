import React, { Component } from 'react';
import Heading from '../Components/Heading';
import DocumentSection from '../Components/DocumentSection';
import SearchBox from '../Components/Searchbox';
class Homepage extends Component {
    render() { 
        return (  
            <div className="d-block"> 
                <Heading />
                <SearchBox />
                <DocumentSection name= "Recently Document"/>
                <DocumentSection name= "Favorite Document"/>
                <div className="footer-copyright text-center py-3">© 2019 Copyright:
                    <a href="/"> Capstone Project</a>
                </div>
            </div>
        );
    }
}
 
export default Homepage;
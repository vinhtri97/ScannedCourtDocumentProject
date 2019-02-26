import React, { Component } from 'react';
import Heading from '../Toolbar/heading.jsx';
import DocumentSection from './DocumentSection';
import SearchBox from './Searchbox.jsx';
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
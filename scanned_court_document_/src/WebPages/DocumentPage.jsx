import React, { Component } from 'react';
import SearchBox from '../Components/Searchbox'
import DocumentSection from '../Components/DocumentSection'
class DocumentPage extends Component {
    render() { 
        return ( 
            <div>
                <SearchBox />
                <DocumentSection name="All Documents" />
            </div>
         );
    }
} 
 
export default DocumentPage;
import React, { Component } from 'react';
import PdfPreview from './PdfPreview'
class DocumentSection extends Component {
    render() { 
        return (  
            <div className="d-block" style={{marginTop : '3%'}}>
                <p className="h4 mb-2 text-dark text-center border-bottom">{this.props.name}</p>
                <PdfPreview />
                <PdfPreview />
                <PdfPreview />
                <PdfPreview />
            </div>
        );
    }
}
const containerStyle = {
    paddingRight : '15%',
    paddingLeft : '15%'
};
const imageStyle = {
    marginTop : "5px",
    marginLeft : "3%",
    width : "13%",
    height : "40%"
};
export default DocumentSection
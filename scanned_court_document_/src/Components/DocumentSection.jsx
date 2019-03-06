import React, { Component } from 'react';
import PdfPreview from './PdfPreview'
class DocumentSection extends Component {
    generatePdfPreview(section) {
        var pdfPreviewList =[];
        if (section == "Recently Document")
            for(let i=0; i<4; i++)
                pdfPreviewList.push(<PdfPreview key={i} name="RecentlyDocument"/>)
        else if (section == "Favorite Document")
            for(let i=0; i<4; i++)
                pdfPreviewList.push(<PdfPreview key={i} name="RecentlyDocument"/>)   
        return pdfPreviewList;
    };
    render() { 
        return (  
            <div className="d-block" style={{marginTop : '3%'}}>
                <p className="h4 mb-2 text-dark text-center border-bottom">{this.props.name}</p>
                {this.generatePdfPreview(this.props.name)}
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
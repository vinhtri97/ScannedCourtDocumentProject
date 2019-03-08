import React, { Component } from 'react';
import PdfPreview from './PdfPreview'
class DocumentSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            pdfList : [],
        };
    }
    generatePdfPreview(section) {
        if (section == "Recently Document")
            fetch('/RecentlyDocument')
                .then(response => response.json())
                .then(data => this.setState({ pdfList:data }));
        else if (section == "All Documents")
            fetch('/AllDocuments')
                .then(response => response.json())
                .then(data => this.setState({ pdfList:data }));


        let pdfPreviewList = [];
        this.state.pdfList.map(pdf => pdfPreviewList.push(<PdfPreview type={pdf.type} name={pdf.name} />))
        
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
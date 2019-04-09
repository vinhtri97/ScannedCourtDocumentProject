import React, { Component } from 'react';
import PdfPreview from './PdfPreview'
class DocumentSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            pdfList : [],
            pdfPreviewList: []
        };
        this.generatePdfPreview = this.generatePdfPreview.bind(this);
    }
    async generatePdfPreview(section) {
        var pdfPreviewList = [];
        var fetchURL;
        if (section == "Recently Document"){
            fetchURL = '/RecentlyDocument';
        }
        else if (section == "All Documents"){
            fetchURL = '/AllDocuments';
        }
        else if (section == "Search Result"){
            fetchURL = '/RecentlyDocument';
        }
        const response = await fetch(fetchURL);
        const data = await response.json();
        data.map(pdf => {pdfPreviewList.push(<PdfPreview type={pdf.type} name={pdf.name} />)})
        return pdfPreviewList;
    }
    componentDidMount(){
        this.generatePdfPreview(this.props.name)
        .then(value => {this.setState({
            pdfPreviewList:value
        })})
    }
    render() { 
        return (  
            <div className="d-block" style={{marginTop : '3%'}}>
                <p className="h4 mb-2 text-dark text-center border-bottom">{this.props.name}</p>
                {this.state.pdfPreviewList}
            </div>
        );
    }
}
export default DocumentSection
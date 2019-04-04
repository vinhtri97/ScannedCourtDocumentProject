import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfContent extends Component {
    state = { 
        uploadFile:this.props.uploadFile,
        pageNumber:1,
        numPages:null
     }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }
    nextBtnHandler = (e) =>{
        this.state.pageNumber < this.state.numPages &&
            this.setState({
                pageNumber: this.state.pageNumber+1
            })
        e.preventDefault();
    }
    previousBtnHandler = (e) =>{
        this.state.pageNumber > 1 && 
            this.setState({
                pageNumber: this.state.pageNumber-1
            })
        e.preventDefault();
    }
    render() { 
        this.state.uploadFile = this.props.uploadFile;
        return ( 
            <div>
                <Document 
                    file={this.state.uploadFile}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >
                    <Page pageNumber={this.state.pageNumber}></Page>
                </Document>
                {  
                    (this.state.numPages != null) && 
                    <div className="text-right mt-2">
                        <button className="btn btn-sm btn-info mr-2" onClick={this.previousBtnHandler}>Previous</button>
                        <button className="btn btn-sm btn-info" onClick={this.nextBtnHandler}>Nextpage</button>
                    </div>
                }
            </div>
         );
    }
}
 
export default PdfContent;
import React, { Component } from 'react';
import RichTextEditor from '../Components/RichTextEditor'
import PdfContent from '../Components/PdfContent'
class ManualUploadPage extends Component {
    render() { 
        return (  
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <RichTextEditor></RichTextEditor>
                    </div>
                    <div className="col-6">
                        <PdfContent uploadFile = {this.props.location.state.uploadFile}></PdfContent>
                    </div>
                </div>
            </div>
        );
    }
}
export default ManualUploadPage;
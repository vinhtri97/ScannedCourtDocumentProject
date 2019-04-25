import React, { Component } from 'react';
import RichTextEditor from '../Components/RichTextEditor'
import PdfContent from '../Components/PdfContent'
class ManualUploadPage extends Component {
    state = {
        editorStateText:null
    }
    onEditorStateChange = (editorStateText) =>{
        this.setState({editorStateText});
    }
    onClickSaveButton = (e) =>{
        var jsPDF = require('jspdf');
        var doc = new jsPDF();
        doc.text(this.state.editorStateText, 10, 10);
        fetch('/manualUploadDocument', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: this.props.location.state.uploadFile.name,
                editorStateText : this.state.editorStateText,
                documentType: this.props.location.state.documentType
            })
        })
        .then(response =>{
            if (response.status == 200){
                alert("Your metadata was uploaded to database successfully");
                this.props.history.push('/user_option');
            }
        })
        .catch(err => { console.log(err) } )
    }
    render() { 
        return (  
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <RichTextEditor editorStateChangeHandler={this.onEditorStateChange}></RichTextEditor>
                        <div className="container text-center">
                            <button className="btn btn-info mt-2 col-6 w-25" type="button" onClick={this.onClickSaveButton}>Upload</button>
                        </div>                       
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
import React, { Component } from 'react';
import PdfContent from '../Components/PdfContent'
class UpLoadDocumentPage extends Component {
    state = {
        uploadFile: null,
        pageNumber: 1,
        numPages: null,
        documentType: 'Criminal'
    }
    fileChangeHandler = (event) => {
        this.setState({
            uploadFile: event.target.files[0],
            pageNumber: 1,
            numPages: null
        });
    }
    onFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('pdfUpload', this.state.uploadFile);
        formData.append('documentType', this.state.documentType);
        fetch('/uploadDocument', {
            method: 'POST',
            body: formData
        })
        .then(response =>{
            alert("Your pdf was uploaded to database successfully");
            this.props.history.push({
                pathname: '/manual_upload',
                state: { 
                    uploadFile: this.state.uploadFile,
                    documentType: this.state.documentType
                }
            });
        })
        .catch(err => { console.log(err) } )    
    }

    selectOnChangeHandler = (e) =>{
        this.setState({
            documentType:e.target.value
        })
    }
    render() {
        { }
        return (
            <div className="container bg-light">
                <div className="row">
                    <div className="col-4 mt-3">
                        <form onChange={this.radioBtnHandler} onSubmit={this.onFormSubmit}>
                            <input type="file" onChange={this.fileChangeHandler} name="pdfUpload" className="d-block text-success " accept="application/pdf"></input>
                            {
                                this.state.uploadFile != null &&
                                <div className="mt-4">
                                    <select name="documentType" value={this.state.documentType} onChange={this.selectOnChangeHandler}>
                                        <option value="Civil">Civil</option>
                                        <option value="Criminal">Criminal</option>
                                    </select>
                                    <button className="d-block btn btn-sm mt-4 btn-info" type="submit">Upload Document</button>
                                </div>
                            }
                        </form>
                    </div>
                    <div className="col-8 mt-0">
                        <PdfContent uploadFile={this.state.uploadFile}></PdfContent>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpLoadDocumentPage;
import React, { Component } from 'react';
import PdfContent from '../Components/PdfContent'
class UpLoadDocumentPage extends Component {
    state = {
        uploadFile: null,
        computerVision: true,
        pageNumber: 1,
        numPages: null
    }
    fileChangeHandler = (event) => {
        this.setState({
            uploadFile: event.target.files[0],
            pageNumber: 1,
            numPages: null
        });
    }
    radioBtnHandler = (e) => {
        const { name } = e.target;
        if (name === "computerVision")
            this.setState({
                computerVision: true
            })
        else
            this.setState({
                computerVision: false
            })
    }
    onFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('pdfUpload', this.state.uploadFile);
        if (this.state.computerVision) {
            fetch('/uploadDocument', {
                method: 'POST',
                body: formData
            })
            .then(response =>{
                alert("Your pdf was uploaded to database successfully");
                this.props.history.push('/user_option');
            })
            .catch(err => { console.log(err) } )
        }
        else
            this.props.history.push({
                pathname: '/manual_upload',
                state: { uploadFile: this.state.uploadFile }
            });
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
                                    <label className="d-block"><input type="radio" name="computerVision" checked={this.state.computerVision}></input>Computer Vision</label>
                                    <label className="d-block"><input type="radio" name="manualTyping" checked={!this.state.computerVision}></input>Manual Typing</label>
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
import React, { Component } from 'react';
import { pdfjs } from 'react-pdf';
import PdfContent from '../Components/PdfContent'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
class UpLoadDocumentPage extends Component {
    state = { 
        uploadFile:null,
        computerVision:true,
     }
    fileChangeHandler = (event) =>{
        this.setState({
            uploadFile:event.target.files[0],
            pageNumber: 1,
            numPages:null
        });
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
    radioBtnHandler = (e) =>{
        const {name} = e.target;
        if (name === "computerVision")
            this.setState({
                computerVision:true
            })
        else
            this.setState({
                computerVision:false
            })
    }
    upLoadBtnHandler = () =>{
        if (this.state.computerVision)
            this.props.history.push("/user_option");
        else
            this.props.history.push({
                pathname: '/manual_upload',
                state: {uploadFile:this.state.uploadFile}
            });
    }
    render() { 
        {}
        return ( 
            <div className="container bg-light">
                <div className="row">
                    <div className="col-4 mt-5">
                        <input type="file" onChange={this.fileChangeHandler} className="d-block text-success " accept="application/pdf"></input>
                        {
                            this.state.uploadFile != null && 
                            <form className="mt-5" onChange={this.radioBtnHandler}>
                                <label className="d-block"><input type="radio" name="computerVision" checked={this.state.computerVision}></input>Computer Vision</label>
                                <label className="d-block"><input type="radio" name="manualTyping" checked={!this.state.computerVision}></input>Manual Typing</label>
                                <button className="d-block btn btn-sm mt-4 btn-info" onClick={this.upLoadBtnHandler}>Upload Document</button>
                            </form>
                                
                        }
                    </div>
                    <div className="col-8 mt-0">
                        <PdfContent uploadFile = {this.state.uploadFile}></PdfContent>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default UpLoadDocumentPage;
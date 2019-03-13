import React, { Component } from 'react';
class PdfPreviewCard extends Component {
    componentDidMount(){
        fetch(`/PdfPreview/${this.props.type}/${this.props.name}`)
            .then(res => res.blob())
            .then(
                (result) =>{
                    try{
                        var url = URL.createObjectURL(result);
                        console.log(url);
                        const canvas = this.refs.canvas;const ctx = canvas.getContext("2d");
                        const img = new Image();
                        img.src = url;
                        img.onload = () =>{
                            ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);  
                        }
                    }
                    catch(error){
                        //console.error(error);
                        return;
                    }
                    
                }
            )
    }
    render() { 
        return ( 
            <div className="card d-inline-block" style={{width: '15rem',marginLeft:'7%',marginTop:'2%'}}>
                <canvas ref="canvas" className="card-img-top" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.name}</h5>
                    <p className="card-text">This is portion to display brief desciption of PDF files</p>
                    <a href={`http://localhost:5000/PdfDocument/${this.props.type}/${this.props.name}`} className="btn btn-primary" target="_blank">View as PDF</a>
                </div>
            </div>
         );
    }
}
const pdfImg = require("../Resources/pdf.jpg")
export default PdfPreviewCard;
import React, { Component } from 'react';
class PdfPreviewCard extends Component {
    componentDidMount(){
        fetch("/RecentlyPDF")
            .then(res => res.blob())
            .then(
                (result) =>{
                    var url = URL.createObjectURL(result);
                    console.log(url);
                    const canvas = this.refs.canvas;
                    const ctx = canvas.getContext("2d");
                    const img = new Image();
                    img.src = url;
                    img.onload = () =>{
                        ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
                    }
                }
            )
    }
    render() { 
        return ( 
            <div className="card d-inline-block" style={{width: '15rem',marginLeft:'7%',marginTop:'2%'}}>
                <canvas ref="canvas" className="card-img-top" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="/" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
         );
    }
}
const pdfImg = require("../Resources/pdf.jpg")
export default PdfPreviewCard;
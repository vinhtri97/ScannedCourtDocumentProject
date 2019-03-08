const express = require('express');
const app = express();
var recentlyDocument =[
    {"id":"1","name":"20190205141832343","type":"Civil"},
    {"id":"2","name":"20190205141854850","type":"Civil"},
    {"id":"3","name":"20190205141907790","type":"Civil"},
    {"id":"4","name":"20190205141922224","type":"Civil"}
]

app.get('/RecentlyDocument', (req,res) => {
    res.send(recentlyDocument);
});

//http://localhost:5000/PdfPreview/civil/testfile
app.get('/PdfPreview/:type/:name', (req,res) => {
    const fs = require('fs');
    dir = `D:\\TAMUCC\\Spring2019\\SeniorCapstone\\Project\\Databases\\PdfPreview\\${req.params.name}-1.jpg`;
    let pdfPreviewExist = fs.existsSync(dir);
    if (!pdfPreviewExist){
        let file = `..\\Databases\\${req.params.type}\\${req.params.name}.pdf`;
        const generatePdf = require('./generatePdfPreview');
        generatePdf(file);
    } 
    res.sendFile(dir);
});

app.get('/AllDocuments', (req,res) =>{
    let pdfDocumets = [];
    const fs = require('fs');
    const path = require('path')
    let directories = [{type:"Civil", directory:path.dirname(__dirname) + '\\Databases\\Civil'}, 
                         {type:"Criminal", directory:path.dirname(__dirname) + '\\Databases\\Criminal'}];
    directories.map(dir =>{
        let directory = dir.directory;
        filenames = fs.readdirSync(directory);
        filenames.map(file => {
            pdfDocumets.push({"name":path.basename(file,'.pdf'),"type":dir.type});
        });
    });
    
    res.send(pdfDocumets);
});

const port = 5000;
app.listen(port,()=> console.log('Listening on port 5000 ....'));
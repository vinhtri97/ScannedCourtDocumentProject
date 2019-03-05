const express = require('express');
const app = express();

//convert PDF first page to img
app.get('/RecentlyDocument/:id', (req,res) => {
    const path = require('path');
    const pdf = require('pdf-poppler');
    let file = "..\\Databases\\Civil\\testfile.pdf";

    let opts = {
      format: 'jpeg',
      out_dir: path.dirname("..\\Databases\\RecentlyVisitPDF\\testfile"),
      out_prefix: path.basename(file, path.extname(file)),
      page: null
    }
    pdf.convert(file, opts)
    .then(pdfInfo => {
        res.sendFile("D:\\TAMUCC\\Spring2019\\SeniorCapstone\\Project\\Databases\\RecentlyVisitPDF\\testfile-1.jpg");
    })
    .catch(error => {
        console.error(error);
    })
});
const port = 5000;
app.listen(port,()=> console.log('Listening on port 5000 ....'));
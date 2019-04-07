const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var recentlyDocument = [
    { "id": "1", "name": "20190205141832343", "type": "Civil" },
    { "id": "2", "name": "20190205141854850", "type": "Civil" },
    { "id": "3", "name": "20190205141907790", "type": "Civil" },
    { "id": "4", "name": "20190205141922224", "type": "Civil" }
]

app.get('/RecentlyDocument', (req, res) => {
    res.send(recentlyDocument);
});

//http://localhost:5000/PdfPreview/civil/testfile
app.get('/PdfPreview/:type/:name', (req, res) => {
    const fs = require('fs');
    dir = `D:\\TAMUCC\\Spring2019\\SeniorCapstone\\Project\\Databases\\PdfPreview\\${req.params.name}-1.jpg`;
    let pdfPreviewExist = fs.existsSync(dir);
    if (!pdfPreviewExist) {
        let file = `..\\Databases\\${req.params.type}\\${req.params.name}.pdf`;
        const generatePdf = require('./generatePdfPreview');
        generatePdf(file)
            .then(_ => res.sendFile(dir))

    }
    else { res.sendFile(dir); }
});

//http://localhost:5000/PdfDocument/civil/testfile
app.get('/PdfDocument/:type/:name', (req, res) => {
    const fs = require('fs');
    let dir = `D:\\TAMUCC\\Spring2019\\SeniorCapstone\\Project\\Databases\\${req.params.type}\\${req.params.name}.pdf`;
    fs.readFile(dir, function (err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.get('/AllDocuments', (req, res) => {
    let pdfDocumets = [];
    const fs = require('fs');
    const path = require('path')
    let directories = [{ type: "Civil", directory: path.dirname(__dirname) + '\\Databases\\Civil' },
    { type: "Criminal", directory: path.dirname(__dirname) + '\\Databases\\Criminal' }];
    directories.map(dir => {
        let directory = dir.directory;
        filenames = fs.readdirSync(directory);
        filenames.map(file => {
            pdfDocumets.push({ "name": path.basename(file, '.pdf'), "type": dir.type });
        });
    });
    res.send(pdfDocumets);
});

app.post('/login', (req, res) => {
    var jwt = require('jsonwebtoken');
    var user = {
        "user": req.body.username,
        "password": req.body.password
    };
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("SeniorCapstoneProjectDB");
        dbo.collection("users").findOne(user, function (err, result) {
            if (err) throw err;
            if (result) {
                token = jwt.sign(result, 'shhhhh');
                res.json(token);
            }
            else
                res.status(404).send("not_found");
            db.close();
        });
    });
});

const multer = require("multer");
var storage = multer.diskStorage({
    destination: './UploadedFiles',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage }).single('pdfUpload');
app.post('/uploadDocument', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(req.file);
        }
    })
});

const port = 5000;
app.listen(port, () => console.log('Listening on port 5000 ....'));
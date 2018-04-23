//NPM and Node Modules
require('newrelic');
const express = require('express');
const https = require('https');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

//Config
const config = process.env.NODE_ENV == 'production' ? require('./config/config_prod.js') : require('./config/config_dev.js');

//Init of express app
const app = express();


//Init of multer
const upload = multer({dest: path.join(__dirname, './uploads/')});

//Static middleware
app.use(express.static(path.join(__dirname, '../../public')));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error on the server');
});

///Route handlers
app.post('/uploadfile', upload.single('file'), (req,res) => {
    console.log('entered upload file route');
    console.log(req.file);
    
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(getFileMetadata(req.file));
});

app.all('/*', (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found. Please upload a file to get metadata");
});

//Named function declarations
function getFileMetadata(fileObj) {
    console.log(fileObj.path);
    let fileProps = ["originalname", "encoding", "mimetype", "size"];
    let responseObj = {};
    fileProps.forEach(fileProp => {
        responseObj[fileProp] = fileObj[fileProp];
    });
    console.log(responseObj);
    fs.unlink(fileObj.path, err => {
        if(err){
            return console.log(err);
        } else {
            console.log(fileObj.filename+' is deleted');
        }
    });
    return JSON.stringify(responseObj);
}

//Exported functions and objects
module.exports = {
    app,
    getFileMetadata
};
//NPM and Node Modules
const express = require('express');
const https = require('https');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

//Config
const config = process.env.NODE_ENV == 'production' ? require('./config/config_prod.js') : require('./config/config_dev.js');

//Init of express app
const app = express();
module.exports = app;

//Init of multer middleware
const upload = multer({dest:'uploads/'});

//Static middleware
app.use(express.static(path.join(__dirname, '../../public')));

///Route handlers
app.post('/uploadfile', upload.single('file'), (req,res) => {

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
});

app.all('/*', (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found. Please upload a file to get metadata");
});

//Named function declarations
function getFileMetadata(fileObj) {
    console.log(fileObj.file);
    
}
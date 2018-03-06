//const getFileMetadata = require('./src/server/index.js');
const http = require('http');
const config = require('../src/server/config/config_dev.js');
const getFileMetadata = require('../src/server/app.js').getFileMetadata;


test('path /* should respond with status 404', (done) => {
    http.get(config.baseUrl, (res) => {
        expect(res.statusCode).toBe(404);
        done();
    });
});



test('get file data', (done) => {
    let testFileObj = {
        fieldname: 'testfieldname',
        originalname: 'testoriginalname',
        encoding: 'utf8',
        mimetype: 'txt',
        size: '100',
        destination: 'uploads',
        filename: 'uploadedFile',
        path: 'full/path/to/uploaded/file',
        buffer: 'buffer objects'
    };
    expect(getFileMetadata(testFileObj)).toBe(JSON.stringify({
        originalname: 'testoriginalname',
        encoding: 'utf8',
        mimetype: 'txt',
        size: '100',
    }, null, '\t'));
    done();
});


test('file uploads when upload button clicked', (done) => {
    expect(true).toBe(false);
    done();
});
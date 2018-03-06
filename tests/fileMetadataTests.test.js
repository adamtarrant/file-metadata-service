//const getFileMetadata = require('./src/server/index.js');
const http = require('http');
const config = require('../src/server/config/config_dev.js');


test('path /* should respond with status 404', (done) => {
        http.get(config.baseUrl, (res) => {
                expect(res.statusCode).toBe(404);
                done();
        });
    });

test('get file data', () => {
    expect().toBe({});
    done();
});

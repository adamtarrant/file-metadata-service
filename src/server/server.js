const app = require('./app').app;
const config = process.env.NODE_ENV == 'production' ? require('./config/config_prod.js') : require('./config/config_dev.js');

//Listening
app.listen(config.port);
//https.createServer(sslOptions, app).listen(config.HTTPSPort);
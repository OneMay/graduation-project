const app = require('../server');
const mongoose = require('mongoose');
const debug = require('debug')('server:server');
const mongodbUrl = 'mongodb://root:adminpwd@localhost:8088/project?authSource=admin';
//const mongodbUrl = 'mongodb://root:adminpwd@106.13.107.119:8088/project?authSource=admin';
const port = 8000;
app.listen(port);
console.log('started on http://localhost:' + port);
const options = {
   // useMongoClient: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
mongoose.Promise = global.Promise;
mongoose.connect(mongodbUrl,options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("数据库成功连接");
});

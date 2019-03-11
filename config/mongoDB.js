var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/decoder";
var connectiondb = null;

mongodb.connect(url, { useNewUrlParser: true }, (err, connection) => {
    if (err) {
        console.log("err :  ", err)
        process.exit(0);
        return callback(err);
    }
    console.log("mongodb connection successfull :  ")
    connectiondb = connection.db('decoder');
});
function getConnection() {
    return connectiondb
}

module.exports = { connectiondb, getConnection }
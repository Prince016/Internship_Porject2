var mysql = require('mysql')

var connection;

function sqlConnector() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'brahmanchamber2'
    })
    return connection;
}

module.exports = { sqlConnector };
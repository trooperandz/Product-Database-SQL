// Require database information
var mysql = require('mysql');
var secret_keys = require('./secret_keys');

// DB connection object
var dbCxn = {
	conn: mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: secret_keys.password,
		database: 'bamazon_db'
	}),

	connect: function() {
		dbCxn.conn.connect(function(err) {
			if(err) {
				console.log("A database connection error has occurred: " + err);
				throw err;
			}
			console.log(dbCxn.conn.state, ' Thread: ', dbCxn.conn.threadId);
		});
	}
}

// Export to main program
module.exports = dbCxn;
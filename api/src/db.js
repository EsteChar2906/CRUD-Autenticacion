const mysql2 = require('mysql2');
const { promisify } = require('util');
const { db } = require('./config.js');

const pool = mysql2.createConnection(db);

pool.getConnection((err, connection) => {
	if(err){
		console.log(err)
	}

	if(connection) connection.release();
	console.log('DB is Connected');
	return;
});

//promisify para querys
pool.query = promisify(pool.query);

module.exports = pool;

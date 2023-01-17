const mysql2 = require('mysql2');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { promisify } = require('util');
const { db } = require('./config.js');

const pool = mysql2.createPool(db);

pool.getConnection((err, connection) => {
	if(err){
		console.log(err)
	}

	if(connection) connection.release();
	console.log('DB is Connected');
	return;
});

const sessionStore = new MySQLStore(db, pool);

//promisify para querys
pool.query = promisify(pool.query);

module.exports = { pool, sessionStore };

const mysql = require('mysql');
const { promisify } = require('util');
const { db } = require('./config.js');

const pool = mysql.createConnection(db);

pool.connect((err) => {
	if(err){
		console.log(err)
	}
	console.log('DB is Connected');
	return;
});

//promisify para querys
pool.query = promisify(pool.query);

module.exports = pool;
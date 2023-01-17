const mysql = require('mysql');
const { promisify } = require('util');
const { db } = require('./config.js');

const pool = mysql.createConnection(db);

const connection = async() =>{
	await pool.connect((err) => {
		if(err){
			throw err;
		}
		console.log('DB is Connected');
		return;
	})
};

connection();

//promisify para querys
pool.query = promisify(pool.query);

module.exports = pool;
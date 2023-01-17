const { createPool } = require('mysql2/promise');
const { promisify } = require('util');
const { db } = require('./config.js');

const pool = createPool(db);

/*const connection = async() =>{
	await pool.connect((err) => {
		if(err){
			console.log(err.mesage);
		}
		console.log('DB is Connected');
		return;
	})
};

connection()

//promisify para querys
pool.query = promisify(pool.query);*/

module.exports = pool;
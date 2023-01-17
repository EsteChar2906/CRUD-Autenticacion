require('dotenv').config();

module.exports = {
	db:{
		host: process.env.HOST_DB,
		user: process.env.USER_DB,
		password: process.env.PASSWORD_DB,
		port: process.env.PORT_DB,
		database: process.env.NAME_DB
	},
	appS: {
		PORT: process.env.PORT_APP
	}
}

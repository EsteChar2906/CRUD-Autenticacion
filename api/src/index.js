const app = require('./app.js');

const conexionServidor = async () => {
	await app.listen(app.get('port'), () =>{
		console.log(`Listening in port ${app.get('port')}`);
	});
}

conexionServidor();
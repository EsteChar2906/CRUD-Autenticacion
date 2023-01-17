const pool = require('../db.js')
const controller = {
	getNegocios: (req, res) => {
		res.render('negocios/form.hbs')
	},
	postNegocios: async(req, res) => {
		let { Nombre, Direccion, Celular, Correo } = req.body;
		const negocioNuevo = {
			Nombre,
			Direccion,
			Celular,
			Correo
		};

		await pool.query('INSERT INTO negocios set ?', [negocioNuevo]);
		
		req.flash('Realizado', 'Guardado correctamente');
		res.redirect('/api/listnegocios');
	},
	listNegocios: async(req, res) => {
		const negocios = await pool.query('SELECT * FROM negocios');
		console.log(negocios)
		res.render('negocios/listNegocios.hbs', {negocios})
	},
	deleteNegocio: async(req, res) => {
		let { ID } = req.params;

		await pool.query('DELETE FROM negocios WHERE ID = ?', {ID});
		res.redirect('/api/listnegocios')
	},
	editarNegocio: async(req, res) => {
		let { ID } = req.params;
		const negocio = await pool.query('SELECT * FROM negocios WHERE ID = ?', {ID})
		res.render('negocios/editForm.hbs', {negocio: negocio[0]});
	},
	editUpdNegocio: async(req, res) => {
		let { ID } = req.params;
		let { Nombre, Direccion, Celular, Correo} = req.body;

		const negocioNuevo = {
			Nombre,
			Direccion,
			Celular,
			Correo
		};

		await pool.query('UPDATE negocios set ? WHERE ID = ?', {negocioNuevo, ID})
	} 
}

module.exports = controller;
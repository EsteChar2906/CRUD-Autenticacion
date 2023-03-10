const { pool }  = require('../db.js')
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
			Correo,
			User_Id: req.user.ID
		};

		await pool.query('INSERT INTO Negocios set ?', [negocioNuevo]);
		
		req.flash('Realizado', 'Guardado correctamente');
		res.redirect('/api/listnegocios');
	},
	listNegocios: async(req, res) => {
		const IdUser = req.user.ID;
		const rows = await pool.query('SELECT * FROM Negocios WHERE User_id = ?', [IdUser]);
		res.render('negocios/listNegocios.hbs', {negocios: rows})
	},
	deleteNegocio: async(req, res) => {
		let { id } = req.params;

		await pool.query('DELETE FROM Negocios WHERE ID = ?', [id]);
		res.redirect('/api/listnegocios')
	},
	editarNegocio: async(req, res) => {
		let { id } = req.params;
		const rows = await pool.query('SELECT * FROM Negocios WHERE ID = ?', [id])
		res.render('negocios/editForm.hbs', {negocio: rows[0]});
	},
	editUpdNegocio: async(req, res) => {
		let { id } = req.params;
		let { Nombre, Direccion, Celular, Correo} = req.body;

		const negocioNuevo = {
			Nombre,
			Direccion,
			Celular,
			Correo
		};

		await pool.query('UPDATE negocios set ? WHERE ID = ?', [negocioNuevo, id])
	},
	listNegociosAllUser: async(req, res) => {
		const negociosUser = await pool.query('SELECT * FROM Negocios, usuarios WHERE Negocios.User_id = usuarios.ID');
		res.render('negocios/allUsersNegocios.hbs', {negocios: negociosUser});
		
	}
}

module.exports = controller;
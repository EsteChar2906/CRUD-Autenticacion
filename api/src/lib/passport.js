const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db.js');
const helpers = require('./helpers.js')

//login
passport.use('local.singin', new LocalStrategy({
	usernameField: 'Correo',
	passwordField: 'Contraseña',
	passReqToCallback: true
}, async(req, username, password, done) => {
	const rows = await pool.query('SELECT * FROM usuarios WHERE Correo = ?', [username]);
	if(rows.length > 0){
		const user = rows[0];
		const validarContraseña = await helpers.compararContraseña(password, user.Contraseña);
		if(validarContraseña){
			done(null, user, req.flash('realizado', `Bienvenido ${user.Primer_nombre} ${user.Primer_apellido}`));
		} else {
			done(null, false, req.flash('message', 'Contraseña incorrecta'));
		}
	} else {
		return done(null, false, req.flash('message', 'No existe un usuario con ese correo'));
	}
}));

//singup
passport.use('local.singup', new LocalStrategy({
	usernameField: 'Correo',
	passwordField: 'Contraseña',
	passReqToCallback: true
}, async(req, username, password, done) => {
	let { 
		Identificacion, 
		Primer_nombre, 
		Segundo_nombre,
		Primer_apellido,
		Segundo_apellido,
		Celular
	} = req.body;

	const newUser = { 
		Identificacion, 
		Primer_nombre, 
		Segundo_nombre,
		Primer_apellido,
		Segundo_apellido,
		Celular,
		Correo: username,
		Contraseña: password
	};

	newUser.Contraseña = await helpers.encriptarContraseña(password);
	
	const result  = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
	newUser.ID = result.insertId;
	return done(null, newUser);
}));

passport.serializeUser((user, done) => {
	done(null, user.ID);
});

passport.deserializeUser(async (id, done) => {
	const rows = await pool.query('SELECT * FROM usuarios WHERE ID = ?', [id]);
	if(!id){
		done(null, false);
	} else {
		done(null, rows[0])
	}
});
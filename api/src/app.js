const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const {engine} = require('express-handlebars');
const libHandlebars = require('./lib/handlebars.js');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const { appS, db } = require('./config.js');
const routeAuth = require('./routes/autenticacion.js');
const routeNegocio = require('./routes/negocios.js');
const routePagina = require('./routes/paginaInicio.js');

const app = express();
require('./lib/passport.js');
//configuraciones
app.set('port', appS.PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
	defaultLayout: 'main',
	layoutDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: libHandlebars
}));
app.set('views engine', '.hbs');


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
	secret: 'crudnegocios',
	resave: false,
	saveUninitialized: false,
	store: new MySQLStore(db)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
	app.locals.realizado = req.flash('realizado');
	app.locals.message = req.flash('message');
	app.locals.user = req.user;
	next();
})

//routes
app.use('/api', routeAuth);
app.use('/api', routeNegocio);
app.use('/api', routePagina);

//static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
const passport = require('passport');

const controller = {
	singUp: (req, res) => {
		res.render('auth/singup.hbs');
	},
	singIn: (req, res) => {
		res.render('auth/singin.hbs')
	},
	postSingUp: passport.authenticate('local.singup', {
		successRedirect: '/api/profile',
		failureRedirect: '/api/crearuser',
		failureFlash: true
	}),
	postSingIn: async (req, res, next) => {
		passport.authenticate('local.singin', {
			successRedirect: '/api/profile',
			failureRedirect: '/api/loginuser',
			failureFlash: true
		})(req, res, next);
	},
	profile: (req, res) => {
		res.render('profile.hbs');
	},
	logout: async(req, res) => {
		await req.logOut((err) => {
			if(err){
				console.log(err)
			}
		});
		res.redirect('/api/loginuser');
	}
}

module.exports = controller;

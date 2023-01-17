module.exports = {

	isLoggedIn(req, res, next){
		if(req.isAuthenticated()){
			return next();
		} else {
			return res.redirect('/api/loginuser');
		}
	},
	isNotLoggedIn(req, res, next){
		if(!req.isAuthenticated()){
			return next();
		} else {
			return res.redirect('/api/profile');
		}
	}
}
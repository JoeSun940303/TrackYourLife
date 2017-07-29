// app/routes.js
module.exports = function(app, passport,path) {


	app.get('/home', function(req, res) {
		res.render(__dirname+'/home.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/update', function(req, res) {
		res.render(__dirname+'/update.ejs', { message: req.flash('loginMessage') });
	});


	app.get('/account', function(req, res) {
		res.render(__dirname+'/account.ejs',{ registermsg: req.flash('signupMessage'),message:req.flash('loginMessage') });
	});

	// process the login form
	app.post('/signin', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/account', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.post('/signin_home', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	app.post('/signin_update', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/update', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.post('/register', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/account', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/profile', isLoggedIn, function(req, res) {
		 res.render(__dirname+'/profile.ejs',{user : req.user });
	});

	app.get('/meal', isLoggedIn, function(req, res) {
		res.render(__dirname+'/meal.ejs');
	});

	app.get('/overview', isLoggedIn, function(req, res) {
		res.render(__dirname+'/overview.ejs');
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/checklogin',function(req,res){
			console.log("checklogin is called");
			if (req.isAuthenticated())
				res.send(true);
			else
				res.send(false);
	});

};



// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

// app/routes.js
module.exports = function(app, passport,path) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		//res.render('index.ejs'); // load the index.ejs file
		console.log("get /is called");
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form

	app.get('/signin', function(req, res) {

		// render the page and pass in any flash data if it exists
		//res.render('login.ejs', { message: req.flash('loginMessage') });
		console.log("get /signin is called");
	});

	// process the login form
	app.post('/signin', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signin', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/register', function(req, res) {

		// render the page and pass in any flash data if it exists
		//res.render('signup.ejs', { message: req.flash('signupMessage') });
		console.log("get /signup is called");
	});

	// process the signup form
	app.post('/register', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/register', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		//res.render('profile.ejs', {
		//	user : req.user // get the user out of session and pass to template
		//});
		console.log("get / profile is called");
		 res.sendFile( path.join( __dirname, '', 'profile.html' ));
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
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

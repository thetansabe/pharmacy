exports.signUp = (req, res, next) => {
	if (req.cookies.jwt) {
		return res.redirect('http://localhost:3000');
	}
	res.render('register');
};

exports.login = (req, res, next) => {
	if (req.cookies.jwt) {
		return res.redirect('http://localhost:3000');
	}
	res.render('login');
};

exports.changePassword = (req, res, next) => {
	if (!req.cookies.jwt) {
		return res.redirect('http://localhost:3000/login');
	}
	res.render('change-password');
};

exports.homePage = (req, res, next) => {
	res.render('index');
};

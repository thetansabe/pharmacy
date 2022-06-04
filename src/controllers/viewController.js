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

exports.renderCart = (req, res, next) => {
	res.render('shopping-cart');
};

exports.homePage = (req, res, next) => {
	console.log({ blogs: [...req.blogLimits], products: req.products });
	res.render('index', { blogs: [...req.blogLimits], products: req.products });
};

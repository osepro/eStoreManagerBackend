const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

tokenForUser = (user) => {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signup = function (req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	// Error message check

	if (!email || !password) {
		return res.status(422).send({ error: "Email and Password required" });
	}

	// See if email already exist return error
	User.findOne({ email: email }, (err, existingUser) => {
		if (err) return next(err);

		// if user with email does exist
		if (existingUser) {
			return res.status(422).send({ error: "Email is in use" });
		}

		// if user with email does not exist create user
		const user = new User({
			email,
			password,
		});
		user.save((err) => {
			if (err) return next(err);
			res.json({
				message: "User successfully created",
				token: tokenForUser(user),
			});
		});
	});
};

exports.signin = function (req, res, next) {
	res.send({ token: tokenForUser(req.user) });
};

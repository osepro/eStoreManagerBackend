const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

tokenForUSer = (user) => {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.users = function (req, res) {
	// Get all users
	User.find()
		.exec()
		.then((user) => res.status(200).json(user))
		.catch((error) => {
			res.status(500).json({
				message: "An error occurred",
				error,
			});
		});
};

const Authentication = require("./controllers/authentication");
const AllUsers = require("./controllers/allusers");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
	app.get("/", requireAuth, AllUsers.users);
	app.post("/signup", Authentication.signup);
	app.post("/signin", requireSignin, Authentication.signin);
	//app.get("/", (req, res, next) => {
	//	res.send(["waterbottle", "phone", "paper"]);
	//});
};

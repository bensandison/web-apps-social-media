module.exports = function signUp(app) {
	const db = require("./database.js");

	//Handle get requests to /api route
	app.get("/api/signup", (req, res) => {
		res.json({ message: "signup here!!" });
	});

	app.post("/api/signup", function (req, res) {
		db.connect().then((db) => {
			// UNSAFE! Open to SQL injection attacks
			// See: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html#primary-defenses
			db.get(
				'SELECT * FROM users WHERE username = "' +
					username +
					'" AND password = "' +
					password +
					'"'
			).then((result) => {
				// SAFE
			});
		});
	});
};

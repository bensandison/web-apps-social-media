module.exports = function signUp(app) {
	const db = require("./database.js");

	//Handle get requests to /api route
	app.get("/api/signup", (req, res) => {
		res.json({ message: "signup here!!" });
	});

	app.post("/api/signup", function (req, res) {
		db.connect().then(db => {
			// UNSAFE! Open to SQL injection attacks
			// See: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html#primary-defenses
			db.get('SELECT * FROM users WHERE username = "' + username + '" AND password = "' + password + '"').then(result => {
			// SAFE
				if()
			})
	});

	login(username, password, callback) {
		DB.connect().then(db => {
				// UNSAFE! Open to SQL injection attacks
				// See: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html#primary-defenses
				db.get('SELECT * FROM users WHERE username = "' + username + '" AND password = "' + password + '"').then(result => {
				// SAFE
				// db.get('SELECT * FROM users WHERE username = ? AND password = ?', username, password).then(result => {
						if (result && !result.token) {
								// Create an API token for the user if they don't have one
								let token = UUID.v4();
								db.run('UPDATE users SET token = ? WHERE id = ?', token, result.id).then(() => {
										result.token = token
										callback(result)
								})
						}
						else {
								callback(result)
						}
				})
				.catch(err => {
						console.log('users.login failed with error:' + err)
				})
		})
},
};

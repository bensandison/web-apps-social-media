const bcrypt = require("bcrypt");
const db = require("./database.js");
const UUID = require("uuid");
const { findByToken } = require("./utils");

function createSession(req, res, next) {
	db.get(
		"SELECT * FROM user WHERE email = ?",
		[req.body.email],
		function (err, row) {
			if (err) return next(err);
			if (!row) return next(new Error("Incorrect username or password")); //Incorrect User Name

			//compare user submited password against database
			bcrypt.compare(req.body.password, row.password, function (err, result) {
				if (err) return next(err); //bcrypt.compare error
				if (!result) next(new Error("Incorrect username or password")); //Incorrect Password

				if (row && !row.token) {
					//if user has no token in DB
					// Create an API token for the user if they dont already have one:
					let token = UUID.v4();

					//Store token in user db
					const sqlRun = "UPDATE user SET token = ? WHERE id = ?";
					db.run(sqlRun, [token, row.id], function (err) {
						if (err) return next(err);

						row.token = token; //add token to user data
						res.json(row); //respond with user data including new token
					});
				} else res.json(row); //respond with user data
			});
		}
	);
}

//Get User Data from Token
function getUserByToken(req, res, next) {
	findByToken(req.body.token, function (err, result) {
		if (err) return next(err);
		else res.json(result);
	});
}

module.exports = { createSession, getUserByToken };

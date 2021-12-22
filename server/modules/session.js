const bcrypt = require("bcrypt");
const db = require("./database.js");
const UUID = require("uuid");

function createSession(req, res, next) {
	const sqlGet = "SELECT * FROM user WHERE email = ?";
	db.get(sqlGet, [req.body.email], function (err, row) {
		if (!row) next("Incorrect username or password"); //Incorrect User Name

		//compare user submited password against database
		bcrypt.compare(req.body.password, row.password, function (err, result) {
			if (!result) next("Incorrect username or password"); //Incorrect Password

			if (row && !row.token) {
				//if user has no token in DB
				// Create an API token for the user if they dont already have one:
				let token = UUID.v4();

				//Store token in user db
				const sqlRun = "UPDATE user SET token = ? WHERE id = ?";
				db.run(sqlRun, [token, row.id], function () {
					row.token = token; //add token to user data
					res.json(row); //respond with user data including new token
				});
			} else res.json(row); //respond with user data
		});
	});
}

//Get User Data from Token
function findByToken(req, res, next) {
	db.get(
		"SELECT * FROM use WHERE token = ?",
		req.body.token,
		function (err, row) {
			if (err) return next(err); //database.get fails
			//for empty user data:
			if (!row) return next(new Error("No user data for this token"));
			else res.json(row); // respond with user data
		}
	);
}

module.exports = { createSession, findByToken };

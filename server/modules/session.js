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
				if (!result) return next(new Error("Incorrect username or password")); //Incorrect Password

				if (row && !row.token) {
					//if user has no token in DB
					// Create an API token for the user if they dont already have one:
					row.token = UUID.v4();

					//Store token in user db
					const sqlRun = "UPDATE user SET token = ? WHERE id = ?";
					db.run(sqlRun, [row.token, row.id], function (err) {
						if (err) return next(err);
					});
				}
				console.log(row);
				res
					.cookie("token", row.token, { expires: new Date(253402300000000) }) //cookie expires: Approx Friday, 31 Dec 9999 23:59:59 GMT
					.json({ data: row }); //also respond with user data
			});
		}
	);
}

//Get User Data from Token
function getUserByToken(req, res, next) {
	findByToken(req.cookies.token, function (err, result) {
		if (err) return next(err);
		else res.json({ data: result }); //respond with user data
	});
}

module.exports = { createSession, getUserByToken };

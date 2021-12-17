const bcrypt = require("bcrypt");
const db = require("./database.js");
const UUID = require("uuid");
const e = require("express");

function createSession(req, res, next) {
	const sqlGet = "SELECT * FROM user WHERE email = ?";
	db.get(sqlGet, [req.body.email], function (err, row) {
		if (!row) next("Incorrect username or password");

		if (row && !row.token) {
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
}

module.exports = { createSession };

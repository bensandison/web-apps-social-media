const bcrypt = require("bcrypt");
const db = require("./database.js");
const UUID = require("uuid");

function createSession(req, res) {
	let result = false; //stores new sql row including token
	const sqlGet = "SELECT * FROM user WHERE email = ?";
	db.get(sqlGet, [req.body.email], function (err, row) {
		if (row) result = row; //set result to row if it was returned properley

		if (row && !row.token) {
			// Check uses dosent already have a token
			// Create an API token for the user:
			let token = UUID.v4();

			//Store token in user db
			const sqlRun = "UPDATE user SET token = ? WHERE id = ?";
			db.run(sqlRun, [token, row.id], function () {
				result.token = token;
				res.json(result);
			});
		} else {
			res.json(result);
		}
	})
}

//TODO: add catch for errors

module.exports = { createSession };

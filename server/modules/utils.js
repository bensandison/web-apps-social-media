const db = require("./database.js");

function findByToken(token, callback) {
	db.get("SELECT * FROM user WHERE token = ?", token, function (err, row) {
		if (err) return callback(err); //database.get fails
		//for empty user data:
		if (!row) return callback(new Error("No user data for this token"));
		// respond with user data
		else return callback(null, row);
	});
}

module.exports = { findByToken };

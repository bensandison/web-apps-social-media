const db = require("./database.js");

// takes a token and passes user data to the callback fn
function findByToken(token, callback) {
	db.get("SELECT * FROM user WHERE token = ?", token, function (err, row) {
		// if db.get fails
		if (err) return callback(err);
		// for empty user data:
		if (!row) return callback(new Error("No user data for this token"));
		// respond with user data
		else return callback(null, row);
	});
}

module.exports = { findByToken };

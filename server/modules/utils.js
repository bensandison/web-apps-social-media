const db = require("./database.js");

// finds if token is stored in the system (can also use findByToken if user data is also wanted)
// pass callback function for error handling
function doesTokenExist(token, callback) {
	if (!token) return callback(new Error("No token provided"));
	db.get("SELECT token FROM user WHERE token = ?", token, function (err, row) {
		if (err) return callback(err); //db.get error
		if (!row) return callback(new Error("Token does not exist")); //no row returned
		return callback(); // if the token exists
	});
}

// takes a token and passes user data to the callback fn
function findByToken(token, callback) {
	if (!token) return callback(new Error("No token provided"));
	db.get("SELECT * FROM user WHERE token = ?", token, function (err, row) {
		// if db.get fails
		if (err) return callback(err);
		// for empty user data:
		if (!row) return callback(new Error("No user data for this token"));
		// respond with user data
		else return callback(null, row);
	});
}

module.exports = { doesTokenExist, findByToken };

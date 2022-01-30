const bcrypt = require("bcrypt");
const db = require("./database.js");
const { findByToken, doesTokenExist } = require("./utils");
const saltRounds = 10;

// GET: api/users
function getUsers(req, res, next) {
	doesTokenExist(req.cookies.token, (err) => {
		if (err) return next(err);

		const sql = "select id, name, email from user";
		let params = [];
		db.all(sql, params, (err, rows) => {
			if (err) return next(err);

			res.json({ data: rows });
		});
	});
}

// GET: api/users/id
function getUserById(req, res) {
	const sql = "select * from user where id = ?";
	let params = [req.params.id]; //ID is a special Express.js endpoint with a variable expression
	// E.g: a request using /api/user/1 will filter the query using id = 1
	db.get(sql, params, (err, row) => {
		if (err) return next(err);

		res.json({ data: row });
	});
}

// POST: api/users
function createUser(req, res, next) {
	let errors = [];
	// Email and Password are required
	if (!req.body.name) {
		// body-parser converts req.body to js object
		errors.push("No username specified");
	}
	if (!req.body.password) {
		// body-parser converts req.body to js object
		errors.push("No password specified");
	}
	if (!req.body.email) {
		errors.push("No email specified");
	}

	// If there are errors:
	if (errors.length) {
		errors = errors.join(",");
		return next(new Error(errors));
	}
	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
		if (err) return next(new Error(err));
		const data = {
			name: req.body.name,
			email: req.body.email,
			password: hash,
		};
		const sql = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
		const params = [data.name, data.email, data.password];
		db.run(sql, params, function (err, result) {
			//need to use ES5 function so we can access "this.lastID"
			if (err) return next(new Error(err));
			res.json({
				data: data,
				id: this.lastID, //returning the id means they can retrive the user after creating it
			});
		});
	});
}

// PATCH: /api/users/:id
function updateUser(req, res, next) {
	const data = {
		name: req.body.name,
		email: req.body.email,
	};

	if (!data.name && !data.email)
		return next(new Error("new name OR email must be specified"));

	// COALESENCE function returns the first argument that is not null
	db.run(
		`UPDATE user set name = COALESCE(?,name), email = COALESCE(?,email) WHERE id = ?`,
		[data.name, data.email, req.params.id],
		function (err) {
			if (err) return next(err);
			res.json({
				data: data,
				changes: this.changes, //number of rows updated (can be used for verification)
			});
		}
	);
}

// DELETE: /api/users/id
function deleteUser(req, res, next) {
	db.run("DELETE FROM user WHERE id = ?", req.params.id, function (err) {
		if (err) return next(err);
		res.json({
			changes: this.changes, //If the user was already deleted, or the id was not found, the value will be 0
		});
	});
}

// UNSAFE:
// NO EMAIL VERIFICATION
function updatePassword(req, res, next) {
	const newPassword = req.body.password;
	if (!newPassword) return next(new Error("New password not provided"));

	findByToken(req.cookie.token, (err, userData) => {
		if (err) return next(err);

		/*
		!!!!
		HERE WE WOULD NEED TO VERIFY THE USER THROUGH 2FA (respond to email)
		!!!!
		*/

		// hash newPassword:
		bcrypt.hash(newPassword, saltRounds, function (err, hash) {
			if (err) return next(err);
			// Add pw to db:
			db.run(
				`UPDATE user set password = ? WHERE id = ?`,
				[hash, userData.id],
				function (err) {
					if (err) return next(err);
					res.json({
						message: "pw change success",
						changes: this.changes, //number of rows updated (can be used for verification)
					});
				}
			);
		});
	});
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };

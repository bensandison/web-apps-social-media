var db = require("./database.js");
var md5 = require("md5");

function users(app) {
	//Get a list of users:
	//TODO: Remove passwords from here
	app.get("/api/users", (req, res) => {
		var sql = "select * from user";
		var params = [];
		db.all(sql, params, (err, rows) => {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: "success",
				data: rows,
			});
		});
	});

	//Get single user by ID:
	app.get("/api/users/:id", (req, res) => {
		var sql = "select * from user where id = ?";
		var params = [req.params.id]; //ID is a special Express.js endpoint with a variable expression
		// E.g: a request using /api/user/1 will filter the query using id = 1
		db.get(sql, params, (err, row) => {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: "success",
				data: row,
			});
		});
	});

	// Create New User:
	app.post("/api/users/", (req, res) => {
		var errors = [];
		// Email and Password are required
		if (!req.body.password) {
			// body-parser converts req.body to js object
			errors.push("No password specified");
		}
		if (!req.body.email) {
			errors.push("No email specified");
		}
		if (errors.length) {
			// If there are errors:
			res.status(400).json({ error: errors.join(",") });
			return;
		}
		var data = {
			name: req.body.name,
			email: req.body.email,
			password: md5(req.body.password), //hash password
		};
		var sql = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
		var params = [data.name, data.email, data.password];
		db.run(sql, params, function (err, result) {
			//need to use ES5 function so we can access "this.lastID"
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: "success",
				data: data,
				id: this.lastID, //returning the id means they can retrive the user after creating it
			});
		});
	});

	//Update a user:
	//TODO: add more security for this - users should not be able to update pw and email together
	app.patch("/api/users/:id", (req, res) => {
		var data = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password ? md5(req.body.password) : null, //hash pw if it was sent
		};
		db.run(
			// COALESENCE function returns the first argument that is not null
			`UPDATE user set 
				name = COALESCE(?,name), 
				email = COALESCE(?,email), 
				password = COALESCE(?,password) 
				WHERE id = ?`,
			[data.name, data.email, data.password, req.params.id],
			function (err, result) {
				if (err) {
					res.status(400).json({ error: res.message });
					return;
				}
				res.json({
					message: "success",
					data: data,
					changes: this.changes, //number of rows updated (can be used for verification)
				});
			}
		);
	});

	// Delete a user:
	//Takes a user ID to be deleted
	app.delete("/api/user/:id", (req, res, next) => {
		db.run(
			"DELETE FROM user WHERE id = ?",
			req.params.id,
			function (err, result) {
				if (err) {
					res.status(400).json({ error: res.message });
					return;
				}
				res.json({
					message: "deleted",
					changes: this.changes, //If the user was already deleted, or the id was not found, the value will be 0
				});
			}
		);
	});
}

module.exports = users;

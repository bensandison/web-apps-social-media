var db = require("./database.js");
var md5 = require("md5");

function users(app) {
	//Get a list of users:
	app.get("/api/users", (req, res) => {
		var sql = "select * from user";
		var params = [];
		db.all(sql, params, (err, rows) => {
			console.log(rows);
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
	app.get("/api/user/:id", (req, res) => {
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
	app.post("/api/user/", (req, res) => {
		var errors = [];
		// Email and Password are required
		if (!req.body.password) {
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
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: "success",
				data: data,
				id: this.lastID,
			});
		});
	});
}

module.exports = users;

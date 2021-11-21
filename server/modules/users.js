function users(app) {
	app.get("/api/users", (req, res, next) => {
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
}

module.exports = users;

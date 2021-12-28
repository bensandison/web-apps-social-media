const db = require("./dataBase");

function createPost(req, res, next) {
	let errors = [];
	//get data
	let data = {
		id: req.body.id,
		title: req.body.title,
		body: req.body.body,
	};

	// ID, title and body are required
	if (!data.id) {
		errors.push("No user ID specified");
	}
	if (!data.title) {
		errors.push("No post title specified");
	}
	if (!data.body) {
		errors.push("No post body specified");
	}

	const sql = "INSERT INTO posts (user_id, title, body) VALUES (?,?,?)";
	const params = [data.id, data.title, data.body];
	db.run(sql, params, function (err) {
		//need to use ES5 function so we can access "this.lastID"
		if (err) return next(err);
		res.json({
			message: "post success",
			data: data,
		});
	});
}

function totalPosts(req, res, next) {
	db.get(
		"SELECT * FROM posts ORDER BY post_index DESC LIMIT 1",
		[],
		function (err, result) {
			if (err) return next(err);
			if (!result) return next(new Error("No result found"));
			res.json({
				message: "post success",
				data: result.post_index,
			});
		}
	);
}

module.exports = { createPost, totalPosts };

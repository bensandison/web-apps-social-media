const db = require("./dataBase");
const { findByToken, doesTokenExist } = require("./utils");

function createPost(req, res, next) {
	//get data
	let data = {
		token: req.body.token,
		title: req.body.title,
		body: req.body.body,
		userID: null,
		userName: null,
	};

	//verify user is logged in and get user data
	findByToken(req.body.token, function (err, result) {
		// deal with any error passed to callback
		if (err) {
			// ID, title and body are required:
			if (!data.token) {
				return next(new Error("No user token specified"));
			}
			if (!data.title) {
				return next(new Error("No post title specified"));
			}
			if (!data.body) {
				return next(new Error("No post body specified"));
			}

			// else, return error message:
			return next(err);
		}

		//set user data to data object
		data.userID = result.id;
		data.userName = result.name;

		//add post data to db:
		db.run(
			"INSERT INTO posts (user_id, user_name, title, body) VALUES (?,?,?,?)",
			[data.userID, data.userName, data.title, data.body],
			function (err) {
				if (err) return next(err);
				res.json({ data: data });
			}
		);
	});
}

//returns the index of the most recent post:
function totalPosts(req, res, next) {
	//error is thrown if the token does not exist
	doesTokenExist(req.cookies.token, function (err, result) {
		if (err) return next(err);

		//get data from most recent post
		db.get(
			"SELECT post_index FROM posts ORDER BY post_index DESC LIMIT 1",
			[],
			function (err, result) {
				if (err) return next(err);
				if (!result) return next(new Error("No result found"));
				//return index of most recent post
				res.json({ data: result.post_index });
			}
		);
	});
}

function getPosts(req, res, next) {
	const offset = req.body.indexMax - req.body.postsNum;

	// nested select statement to order posts descending:
	db.all(
		"SELECT * FROM ( SELECT * FROM posts ORDER BY post_index LIMIT ? OFFSET ? ) ORDER BY post_index DESC",
		[req.body.postsNum, offset],
		function (err, result) {
			if (err) {
				//check params exist:
				if (!req.body.postsNum || !req.body.indexMax)
					return next(
						new Error("Must provide indexMin and postsNum parameters")
					);
				else return next(err);
			}
			if (!result) return next(new Error("No result found"));
			res.json({ data: result });
		}
	);
}

module.exports = { createPost, totalPosts, getPosts };

const db = require("./dataBase");
const { findByToken, doesTokenExist } = require("./utils");

function createPost(req, res, next) {
	// Verify user is logged in and get user data:
	findByToken(req.cookies.token, function (err, result) {
		// Error handling:
		if (err) return next(err);
		// Title and body are required:
		if (!req.body.title) {
			return next(new Error("No post title specified"));
		}
		if (!req.body.body) {
			return next(new Error("No post body specified"));
		}

		const data = {
			title: req.body.title,
			body: req.body.body,
			userID: result.id,
			userName: result.name,
			imageName: req.file.filename ? req.file.filename : null, //if no image set to null
		};
		console.log(data);

		//add post data to db:
		db.run(
			"INSERT INTO posts (user_id, user_name, title, body, image_name) VALUES (?,?,?,?,?)",
			[data.userID, data.userName, data.title, data.body, data.imageName],
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

//get a range of posts from a maximum index and number of posts:
function getPosts(req, res, next) {
	//error is thrown if the token does not exist
	doesTokenExist(req.cookies.token, function (err) {
		if (err) return next(err);

		// calculate offset for sql query
		const offset = req.body.indexMax - req.body.postsNum;
		// nested select statement to order posts descending:
		db.all(
			"SELECT * FROM ( SELECT * FROM posts ORDER BY post_index LIMIT ? OFFSET ? ) ORDER BY post_index DESC",
			[req.body.postsNum, offset],
			function (err, result) {
				if (err) {
					//check params exist:
					if (!req.body.postsNum || !req.body.indexMax)
						return next(new Error("Missing parameters"));
					else return next(err);
				}
				if (!result) return next(new Error("No result found"));
				res.json({ data: result }); //respond with posts
			}
		);
	});
}

//get a all posts:
function getAllPosts(req, res, next) {
	// Check the user has a valid session:
	doesTokenExist(req.cookies.token, function (err) {
		if (err) return next(err);

		db.all(
			"SELECT * FROM posts ORDER BY post_index DESC",
			[],
			function (err, result) {
				if (err) return next(err);
				if (!result) return next(new Error("No result found"));
				res.json({ data: result }); //respond with posts
			}
		);
	});
}

module.exports = { createPost, totalPosts, getPosts, getAllPosts };

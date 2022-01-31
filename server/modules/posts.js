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
			imageName: req.file ? req.file.filename : null, //if no image set to null
		};
		console.log(data);

		//add post data to db:
		db.run(
			"INSERT INTO posts (user_id, user_name, title, body, image_name) VALUES (?,?,?,?,?)",
			[data.userID, data.userName, data.title, data.body, data.imageName],
			function (err, result) {
				if (err) return next(err);
				res.json({ postID: this.lastID });
			}
		);
	});
}

//returns the index of the most recent post:
function getStartIndex(req, res, next) {
	//error is thrown if the token does not exist
	doesTokenExist(req.cookies.token, function (err, result) {
		if (err) return next(err);

		//get data from most recent post
		db.get(
			"SELECT post_index FROM posts ORDER BY post_index DESC LIMIT 1",
			[],
			function (err, result) {
				if (err) return next(err);
				//return index of most recent post
				res.json({ startIndex: result.post_index });
			}
		);
	});
}

// get up to 10 posts starting at the index provided:
// use getStartIndex to get the index of the first post:
function getPosts(req, res, next) {
	if (!req.body.startIndex) return next(new Error("No startIndex provided"));

	// Number of posts to be returned:
	const postsNum = 10;

	doesTokenExist(req.cookies.token, function (err) {
		//error is thrown if the token does not exist
		if (err) return next(err);

		db.all(
			"SELECT * FROM ( SELECT * FROM ( SELECT * FROM posts WHERE post_index <= ? ) LIMIT ? ) ORDER BY post_index DESC",
			[req.body.startIndex, postsNum],
			function (err, result) {
				if (err) {
					return next(err);
				}

				res.json({
					data: result,
					startIndex: result.at(-1).post_index, // .at(-1) gets last element in the array
				}); //respond with posts
				// startIndex can be passed to getPosts again to get the next batch of 10 posts
			}
		);
	});
}

//get a all posts:
// Now using getPosts (to get small batches at a time)
function getAllPosts(req, res, next) {
	// Check the user has a valid session:
	doesTokenExist(req.cookies.token, function (err) {
		if (err) return next(err);

		db.all(
			"SELECT * FROM posts ORDER BY post_index DESC",
			[],
			function (err, result) {
				if (err) return next(err);
				res.json({ data: result }); //respond with posts
			}
		);
	});
}

module.exports = {
	createPost,
	getStartIndex,
	getPosts,
	getAllPosts,
};

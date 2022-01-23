const db = require("./database");
const { findByToken } = require("./utils");

// Will be storing the number of likes in the posts db.
// Likes db will only be used to auth one like per user
function toggleLike(req, res, next) {
	// PARAMS: postID
	if (!req.body.postID) return next(new Error("No postID provided"));

	// add/remove user and post ID to likes db
	// update likes count in posts db
	// send back users "liked state" (has the user liked the post)
	// send back new total likes count
	findByToken(req.cookies.token, function (err, result) {
		if (err) return next(err);

		db.get(
			`SELECT 1 FROM likes WHERE post_id = ? AND user_id = ? LIMIT 1`,
			[req.body.postID, result.id],
			function (err, result) {
				if (err) return next(err);
				console.log("hi");
				console.log(result);
				if (!result) {
					// If like does not already exist
				} else {
					// If like already exists
				}
			}
		);

		// Insert Like
		/*
		db.run(
			`INSERT INTO likes (post_id, user_id) VALUES (?,?)`,
			[req.body.postID, result.id],
			function (err) {
				if (err) return next(err);
				res.json({ data: data });
			}
		);
		*/
	});
}

module.exports = { toggleLike };

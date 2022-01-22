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

		db.run(
			"INSERT INTO likes (post_id, user_id) VALUES (?,?)",
			[req.body.postID, result.id],
			function (err) {
				if (err) return next(err);
				res.json({ data: data });
			}
		);
	});
}

module.exports = { toggleLike };

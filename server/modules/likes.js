const db = require("./database");
const { findByToken, doesTokenExist } = require("./utils");

// Called for each post
// Returns number of likes and if this user has liked the post
// PARAMS: postID
// RETURNS: likeCount, likeStatus
function getLikes(req, res, next) {
	if (!req.body.postID) return next(new Error("No postID provided"));

	findByToken(req.cookies.token, function (err, userData) {
		if (err) return next(err);
		// Get number of likes on post:
		db.get(
			"SELECT COUNT(*) FROM likes WHERE post_id = ?;",
			[req.body.postID],
			function (err, result) {
				if (err) return next(err);
				// Result is returned as an object, change to int variable:
				const likeCount = result ? result[Object.keys(result)[0]] : null;

				// Has this user liked the post?
				db.get(
					"SELECT 1 FROM likes WHERE post_id = ? AND user_id = ? LIMIT 1",
					[req.body.postID, userData.id],
					function (err, result) {
						if (err) return next(err);

						// Result is returned as an object, change to int variable:
						result = result ? result[Object.keys(result)[0]] : null;
						// has the user liked the post?
						const hasLiked = result == 1 ? true : false;

						// Return likedStatus and likedCount
						return res.json({ likeStatus: hasLiked, likeCount: likeCount });
					}
				);
			}
		);
	});
}

// Returns all users who like a post:
// PARAMS: postID
function getLikesList(req, res, next) {
	// Check the user has a valid session:
	doesTokenExist(req.cookies.token, function (err) {
		if (err) return next(err);

		// Get all likes on the post
		db.all(
			"SELECT * FROM likes WHERE post_id = ?",
			[req.body.postID],
			function (err, result) {
				if (err) return next(err);
				res.json(result); //respond with posts
			}
		);
	});
}

module.exports = { getLikes, getLikesList };

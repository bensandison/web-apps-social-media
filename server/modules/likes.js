const db = require("./database");
const { findByToken, doesTokenExist } = require("./utils");

function likeStatusUtil(postID, userID, callback) {
	// Finds if the user has liked the specified post:
	let hasLiked;
	db.get(
		"SELECT 1 FROM likes WHERE post_id = ? AND user_id = ? LIMIT 1",
		[postID, userID],
		function (err, result) {
			if (err) return callback(err);

			// Result is returned as an object, change to int variable:
			result = result ? result[Object.keys(result)[0]] : null;
			// has the user liked the post?
			hasLiked = result == 1 ? true : false;

			return callback(null, hasLiked);
		}
	);
}

function likeCountUtil(postID, callback) {
	// Get number of likes on a post:
	let likeCount;
	db.get(
		"SELECT COUNT(*) FROM likes WHERE post_id = ?;",
		[postID],
		function (err, result) {
			if (err) return callback(err);

			// Result is returned as an object, change to int variable:
			likeCount = result ? result[Object.keys(result)[0]] : null;

			return callback(null, likeCount);
		}
	);
}

// Called for each post
// Returns number of likes and if this user has liked the post
// PARAMS: postID
// RETURNS: likeCount, likeStatus
function getLikes(req, res, next) {
	if (!req.body.postID) return next(new Error("No postID provided"));

	findByToken(req.cookies.token, function (err, userData) {
		if (err) return next(err);

		likeStatusUtil(req.body.postID, userData.id, (err, result) => {
			if (err) return next(err);
			const likeStatus = result;
			likeCountUtil(req.body.postID, (err, result) => {
				if (err) return next(err);
				const likeCount = result;
				// Return data in likeStatus and likeCount as JSON:
				return res.json({ hasLiked: likeStatus, likeCount: likeCount });
			});
		});
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

// Toggles the users like status and returns the new likeStatus
// PARAMS: postID
// RETURNS: likeStatus
function toggleLike(req, res, next) {
	if (!req.body.postID) return next(new Error("No postID provided"));

	findByToken(req.cookies.token, function (err, userData) {
		if (err) return next(err);

		// Find the current likeStatus
		likeStatusUtil(req.body.postID, userData.id, (err, result) => {
			if (err) return next(err);

			const likeStatus = result;
			if (likeStatus) {
				// Remove Like from DB
				db.run(
					"DELETE FROM likes WHERE post_id = ? AND user_id = ?",
					[req.body.postID, userData.id],
					function (err) {
						if (err) return next(err);

						// Like has been deleted, return FALSE likeStatus
						res.json({ likeStatus: false });
					}
				);
			} else {
				// Add like to db
				db.run(
					"INSERT INTO likes (post_id, user_id) VALUES (?,?)",
					[req.body.postID, userData.id],
					function (err) {
						if (err) return next(err);

						// Like has been added, return TRUE likeStatus
						res.json({ likeStatus: true });
					}
				);
			}
		});
	});
}

module.exports = { getLikes, getLikesList, toggleLike };

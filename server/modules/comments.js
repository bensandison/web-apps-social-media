const db = require("./database");
const { findByToken, doesTokenExist } = require("./utils");

// Returns number of comments on that post
function getCommentCount(req, res, next) {
	if (!req.params.postID) return next(new Error("No postID provided"));

	// Check the user has a valid session:
	doesTokenExist(req.cookies.token, function (err) {
		db.get(
			"SELECT COUNT(*) FROM comments WHERE post_id = ?;",
			[req.params.postID],
			function (err, result) {
				if (err) return callback(err);

				// Result is returned as an object, change to int variable:
				const commentCount = result ? result[Object.keys(result)[0]] : null;

				// Respond with comment count
				res.json({ commentCount: commentCount });
			}
		);
	});
}

function getComments(req, res, next) {
	if (!req.params.postID) return next(new Error("No postID provided"));

	// Check the user has a valid session:
	doesTokenExist(req.cookies.token, function (err) {
		if (err) return next(err);

		// Get all likes on the post
		db.all(
			"SELECT * FROM comments WHERE post_id = ?",
			[req.params.postID],
			function (err, result) {
				if (err) return next(err);
				res.json(result); //respond with posts
			}
		);
	});
}

function addComment(req, res, next) {}

// Delete the comment by comment id:
function deleteComment(req, res, next) {
	if (!req.params.commentID) return next(new Error("No postID provided"));

	findByToken(req.cookies.token, function (err, userData) {
		if (err) return next(err);

		db.run(
			"DELETE * FROM comments WHERE id = ? and user_id = ?",
			[req.params.commentID, userData.id],
			function (err) {
				if (err) return next(err);
				res.json({ message: "success" });
			}
		);
	});
}

module.exports = { getCommentCount, getComments, deleteComment, addComment };

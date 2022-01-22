// Will be storing the number of likes in the posts db.
// Likes db will only be used to auth one like per user

function toggleLike(req, res, next) {
	// add/remove user and post ID to likes db
	// update likes count in posts db
	// send back users "liked state" (has the user liked the post)
	// send back new total likes count
}

module.exports = { toggleLike };

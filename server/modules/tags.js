const { findByToken } = require("./utils");

function seperateTags(tags) {
	// Split tags at "#"
	tags = tags.split("#");

	let tagsArr = [];
	tags.map((i) => {
		if (i) {
			// Removes empty space from tags array
			tagsArr.push(i);
		}
	});

	return tagsArr;
}

function addTags(req, res, next) {
	if (!req.body.tags) return next(new Error("Tags are missing"));
	if (!req.params.postID) return next(new Error("post ID is missing"));

	findByToken(req.cookies.token, (err, userData) => {
		if (err) return next(err);

		const tagsArr = seperateTags(req.body.tags);
	});
}

module.exports = { addTags };

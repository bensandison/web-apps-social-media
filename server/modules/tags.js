const { findByToken } = require("./utils");

function seperateTags(tags) {
	// Split tags at "#"
	tagsArr = tags.split("#").filter((el) => {
		return el.length != 0;
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

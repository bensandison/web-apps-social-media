const db = require("./database");
const { findByToken } = require("./utils");

function seperateTags(tags) {
	// Prepend space to tags
	tags = " " + tags;
	// Split tags at " #"
	tagsArr = tags.split(" #");

	return tagsArr;
}

function findTagsInArray(tagsArray, cb) {
	// Returns all tags from an array that already exist in the tags db
	// The key bit here is the map call which builds a string of parameter placeholders.
	// We add one question mark for each item in the tagsArray, then pass the tags array as the second parameter to 'db.all'.
	let query = `SELECT tag FROM tags WHERE tag IN ( ${tagsArray
		.map(() => "?")
		.join(",")} )`;
	db.all(query, tagsArray, (err, result) => {
		if (err) return cb(err);
		else return cb(null, result);
	});
}

function insertMany(tagsArray, callback) {
	// Insert multiple tags to db:
	let query = `INSERT INTO tags ( tag ) VALUES ${tagsArray
		.map(() => "( ?")
		.join(" ), ")} )`;
	db.run(query, tagsArray, callback);
}

function addTags(req, res, next) {
	if (!req.body.tags) return next(new Error("Tags are missing"));
	if (!req.params.postID) return next(new Error("post ID is missing"));

	findByToken(req.cookies.token, (err, userData) => {
		if (err) return next(err);

		// Get tags as an array:
		const tagsArr = seperateTags(req.body.tags);
		if (!tagsArr.length) return next(new Error("Tags array empty"));

		// Which of these tags already exist in db:
		findTagsInArray(tagsArr, (err, result) => {
			if (err) return next(err);

			// first create a Set from tags in db
			let dbTags = new Set(result.map((item) => item.tag));
			// Filter for tags that are not in db
			let uniqueTags = tagsArr.filter((item) => !dbTags.has(item));

			console.log("all:");
			console.log(tagsArr);
			console.log("unique");
			console.log(uniqueTags);
		});
	});
}

module.exports = { addTags };

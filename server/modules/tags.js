const db = require("./database");
const { findByToken } = require("./utils");

function seperateTags(tags) {
	// Split tags at " #"
	let tagsArr = tags.split(/#|\s#/g);
	// remove first element if empty
	if (!tagsArr[0]) tagsArr = tagsArr.splice(1, tagsArr.length);

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

function insertMultiTags(tagsArray, callback) {
	// Insert multiple tags to db:
	let query = `INSERT INTO tags ( tag ) VALUES ${tagsArray
		.map(() => "( ?")
		.join(" ), ")} )`;
	db.run(query, tagsArray, (err, result) => callback(err, result));
}

function addTags(req, res, next) {
	if (!req.body.tags) return next(new Error("Tags are missing"));
	if (!req.params.postID) return next(new Error("post ID is missing"));

	findByToken(req.cookies.token, (err, userData) => {
		if (err) return next(err);

		// Get tags as an array:
		const tagsArr = seperateTags(req.body.tags);
		if (!tagsArr.length) return next(new Error("Tags array empty"));

		// tags table:
		// Which of these tags already exist in db:
		findTagsInArray(tagsArr, (err, result) => {
			if (err) return next(err);

			// first create a Set from tags in db
			let dbTags = new Set(result.map((item) => item.tag));
			// Filter for tags that are not in db
			let uniqueTags = tagsArr.filter((item) => !dbTags.has(item));

			if (uniqueTags.length) {
				insertMultiTags(uniqueTags, (err, result) => {
					if (err) return next(err);

					// Now to insert tag id's into post tags db:
					// Getting tag id's:
					let query = `SELECT * FROM tags WHERE tag IN ( ${tagsArr
						.map(() => "?")
						.join(",")} )`;
					db.all(query, tagsArr, (err, result) => {
						if (err) return next(err);

						console.log(tagsArray);
						console.log(result);
					});
				});
			}
		});
	});
}

module.exports = { addTags };

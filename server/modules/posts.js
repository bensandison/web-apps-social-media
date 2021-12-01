const db = require("./dataBase")

function createPost(req, res) {
    let errors = [];
    //get data
    let data = {
        "id" : req.body.id,
        "title" : req.body.title,
        "body" : req.body.body,
    }

	// ID, title and body are required
	if (!data.id) {
		errors.push("No user ID specified");
	}
	if (!data.title) {
		errors.push("No post title specified");
	}
    if (!data.body){
        errors.push("No post body specified")
    }

    const sql = "INSERT INTO posts (user_id, title, body) VALUES (?,?,?)";
		const params = [data.id, data.title, data.body];
		db.run(sql, params, function (err, result) {
			//need to use ES5 function so we can access "this.lastID"
			if (err) {
                console.log(err);
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				message: "post success",
				data: data,
			});
		});
}

module.exports = { createPost };
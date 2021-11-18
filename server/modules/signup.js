module.exports = function signUp(app) {
	//Handle get requests to /api route
	app.get("/api/signup", (req, res) => {
		res.json({ message: "signup here!!" });
	});

	app.post("/api/signup", function (req, res) {
		console.log(req.body);
		res.send("hello world");
	});
};

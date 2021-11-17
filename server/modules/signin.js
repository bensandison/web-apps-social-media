module.exports = function signIn(app) {
	//Handle get requests to /api route
	app.get("/api/signin", (req, res) => {
		res.json({ message: "signin here!!" });
	});
};

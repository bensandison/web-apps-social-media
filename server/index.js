// server/index.js
const path = require("path");
const bp = require("body-parser");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

//add body parser middleware module to express app:
//this means we can: console.log(req.body);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//Handle get requests to /api route
app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

//Require API modules
require("./modules/users.js")(app); //Users

// http://localhost:3001/api will return a message from the server
app.listen(PORT, () => {
	console.log("Server running on http://localhost:" + PORT);
});

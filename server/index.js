// server/index.js
const path = require("path");
const bp = require("body-parser");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

//pass the bp.json() and the bp.urlencoded({ extended: true }) to the application-level middleware:
//this means we can: console.log(req.body);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

//Handle get requests to /api route
app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

//Require API modules
require("./modules/users.js")(app); //Users

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// http://localhost:3001/api will return a message from the server
app.listen(PORT, () => {
	console.log("Server running on http://localhost:" + PORT);
});

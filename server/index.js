// server/index.js
const path = require("path");
const bp = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

//add body parser middleware module to express app:
//this means we can: console.log(req.body);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//use cookie parser middleware:
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

// http://localhost:3001/api will return a message from the server
app.listen(PORT, () => {
	console.log("Server running on http://localhost:" + PORT);
});

const {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require("./modules/users");
const { createSession } = require("./modules/session");
const {createPost} = require("./modules/posts");

const express = require("express");
const router = express.Router();

//Users Route
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users", updateUser);
router.delete("/users", deleteUser);

//Session Route
router.post("/session", createSession);

//Posts Route
router.post("/posts", createPost);

module.exports = router;

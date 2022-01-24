const {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require("./modules/users");
const { createSession, getUserByToken } = require("./modules/session");
const {
	createPost,
	totalPosts,
	getPosts,
	getAllPosts,
} = require("./modules/posts");
const { upload } = require("./modules/upload");
const { getLikes } = require("./modules/likes");

const express = require("express");
const router = express.Router();

//Users Route
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

//Session Route
router.post("/session", createSession);
router.get("/session", getUserByToken);

//Posts Route
router.post("/posts", upload.single("image"), createPost);
router.get("/posts/last", totalPosts);
router.get("/posts", getPosts);
router.get("/posts/all", getAllPosts);

//Like
router.get("/likes", getLikes);

module.exports = router;

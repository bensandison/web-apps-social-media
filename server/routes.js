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
const { getLikes, getLikesList, toggleLike } = require("./modules/likes");
const {
	getCommentCount,
	getComments,
	deleteComment,
	addComment,
} = require("./modules/comments");

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

//Likes
router.get("/likes/:postID", getLikes);
router.get("/likes/list/:postID", getLikesList);
router.post("/likes/:postID", toggleLike);

//Comments
router.get("/comments/count/:postID", getCommentCount);
router.get("/comments/:postID", getComments);
router.post("/comments/:postID", addComment);
router.delete("/comments/:commentID", deleteComment);

module.exports = router;

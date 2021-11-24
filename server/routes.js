const {getUsers, getUserById, createUser, updateUser, deleteUser} = require("./modules/users")

const express = require("express");
const router = express.Router();

//Users Route
router.get("/users", getUsers);
router.get("/users/id", getUserById);
router.post("/users", createUser);
router.patch("/users", updateUser);
router.delete("/users", deleteUser);

module.exports = router;
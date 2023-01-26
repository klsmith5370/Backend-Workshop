const express = require("express");
const router = express.Router();

// connecting to the controllers for users
const {
    getUsers,
    createUser
} = require("../controllers/userController");

// setting up the route endpoint
router.route("/")
      .get(getUsers)
      .post(createUser)

module.exports = router;
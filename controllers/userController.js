// this is where you create your controller functions to talk to the database
    // the User model will be integrated with the controller

const User = require("../models/User");

// creating a route endpoint - retrieving all users
const getUsers = async (req, res, next) => {
    try {
        const result = await User.find()
        res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .json(result)
    } catch (error) {
        throw new Error(`Error getting all users: ${error.message}`)
    }
}

// creating a new user
const createUser = async (req, res, next) => {
    try {
        const result = await User.create(req.body)

        res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .json(result)
    } catch (error) {
        throw new Error(`Error creating a user: ${error.message}`)
    }
}

// const deleteUser = async (req, res, next) {
    
// }

// const getUser = async (req, res, next) {
    
// }

module.exports = {
    getUsers,
    createUser
}


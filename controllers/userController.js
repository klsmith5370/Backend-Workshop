// this is where you create your controller functions to talk to the database
    // the User model will be integrated with the controller

const User = require("../models/User");

// creating a route endpoint - retrieving all users
const getUsers = async (req, res, next) => {
    try {
        // query parameter
        // const filter = {};
        const options = {};

        // check if the req query is empty?
        if (Object.keys(req.query).length) {
            const {
                sortByFirstName,
                limit
            } = req.query

            // set up our pagination (so not so much data is not being thrown)
            if (limit) options.limit = limit

            // setting up the sorting of the property
            if (sortByFirstName) options.sort = {
                firstName: sortByFirstName === "asc" ? 1 : -1 // 1 is ascending, -1 is descending
            }

        }


        const result = await User.find({}, {}, options);

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
        const user = await User.create(req.body)
        const token = user.getSignedJwtToken()

        const options = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 1000 * 60)
        }

        res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .cookie("token", token, options)
        .json({ success: true, token, user })
    } catch (error) {
        throw new Error(`Error creating a user: ${error.message}`)
    }
}


module.exports = {
    getUsers,
    createUser
}


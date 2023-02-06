// creating a User model

// Creating a schema with mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a JWT token
const bcrypt = require("bcryptjs"); // adds the encryption
const jwt = require("jsonwebtoken"); 

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        maxLength: 20
    },
    firstName: {
        type: String, 
        required: true,

    },
    lastName: {
        type: String, 
        required: true,
    },
    gender: {
        type: String,
        enum: [
            "Male",
            "Female"
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Hashing passwords - with a pre-hook
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Middleware methods
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


module.exports = mongoose.model("User", UserSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["regular", "admin"],
        default: "regular"
    }
})

module.exports = mongoose.model('Users', userSchema);
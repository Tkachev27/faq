const mongoose = require('mongoose')
const Schema = mongoose.Schema
//h
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
})

module.exports = mongoose.model('users', userSchema)

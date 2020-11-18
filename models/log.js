const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('log', logSchema)

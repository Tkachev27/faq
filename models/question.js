const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true,
    },

    viewedNumber: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('question', questionSchema)

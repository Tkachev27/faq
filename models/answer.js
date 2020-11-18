const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    questionId: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('answer', answerSchema)

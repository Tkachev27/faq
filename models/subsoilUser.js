const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subsoilUserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
    },
    // userId: {
    //     type: String,
    //     required: true,
    // },
})

module.exports = mongoose.model('subsoilUser', subsoilUserSchema)

const Answer = require('../models/answer')
const errorHandler = require('../utils/errorHandler')
const moment = require('moment')

module.exports.create = async function (req, res) {
    try {
        newAnswer = req.body
        newAnswer.date = moment().format('DDMMYYYY-HHmmss')
        newAnswer.userId = req.user._id
        const answer = await new Answer(newAnswer).save()
        res.status(201).json(answer)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getByQuestion = async function (req, res) {
    try {
        const answers = await Answer.find({ questionId: req.params.id })
        res.status(200).json(answers)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Answer.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Answer delated.',
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const answer = await Answer.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(answer)
    } catch (e) {
        errorHandler(res, e)
    }
}

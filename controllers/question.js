const Question = require('../models/question')
const errorHandler = require('../utils/errorHandler')
const moment = require('moment')

module.exports.create = async function (req, res) {
    try {
        let newQuestion = req.body
        newQuestion.date = moment().format('DDMMYYYY-HHmmss')
        newQuestion.userId = req.user._id
        const question = await new Question(newQuestion).save()
        res.status(201).json(question)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function (req, res) {
    try {
        const questions = await Question.find({ categoryId: req.params.id })
        res.status(200).json(questions)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Question.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Question delated.',
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const question = await Question.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(question)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        let question = await Question.findById(req.params.id)

        question.viewedNumber++

        const newQuestion = await Question.findOneAndUpdate(
            { _id: question._id },
            { $set: question },
            { new: true }
        )

        res.status(200).json(newQuestion)
    } catch (e) {
        errorHandler(res, e)
    }
}

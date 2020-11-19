const Question = require('../models/question')
const Answer = require('../models/answer')
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
        let questions = await Question.find({ categoryId: req.params.id })

        for (let question of questions) {
            const answers = await Answer.find({ questionId: question._id })

            question.answersAmount = answers.length
        }

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

        const answers = await Answer.find({ questionId: question._id })

        question.answersAmount = answers.length

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
module.exports.getByIdUser = async function (req, res) {
    try {
        let question = await Question.findById(req.params.id)

        question.viewedNumber++

        const answers = await Answer.find({ questionId: question._id })

        question.answersAmount = answers.length

        const newQuestion = await Question.findOneAndUpdate(
            { _id: question._id },
            { $set: question },
            { new: true }
        )

        res.status(200).json({
            question: newQuestion,
            admin:
                req.user._id == newQuestion.userId ||
                req.user._id == '5e551539ff68dc2550dbd36f'
                    ? true
                    : false,
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getByFind = async function (req, res) {
    try {
        const reqWord = req.params.id
        resQuestions = []

        const questions = await Question.find()
        for (let question of questions) {
            let content = question.content.split(' ')

            for (let item of content) {
                if (reqWord == item) {
                    if (
                        resQuestions.findIndex((p) => p._id == question._id) ==
                        -1
                    )
                        resQuestions.push(question)
                }
            }
        }

        res.status(200).json(resQuestions)
    } catch (e) {
        errorHandler(res, e)
    }
}

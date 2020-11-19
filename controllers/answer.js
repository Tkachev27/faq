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
module.exports.getByQuestionUser = async function (req, res) {
    try {
        resAnswers = []
        const answers = await Answer.find({ questionId: req.params.id })

        for (let answer of answers) {
            let obj = {
                answer: answer,
                admin:
                    req.user._id == answer.userId ||
                    req.user._id == '5e551539ff68dc2550dbd36f'
                        ? true
                        : false,
            }
            resAnswers.push(obj)
        }

        res.status(200).json(resAnswers)
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

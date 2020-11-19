const Category = require('../models/category')
const Question = require('../models/question')

const errorHandler = require('../utils/errorHandler')

module.exports.create = async function (req, res) {
    try {
        const category = await new Category(req.body).save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function (req, res) {
    try {
        const categorys = await Category.find()
        res.status(200).json(categorys)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        const questions = await Question.find({ categoryId: req.params.id })
        if (questions.length == 0) {
            await Category.remove({ _id: req.params.id })
            res.status(200).json({
                message: 'Category delated.',
            })
        } else {
            res.status(500).json({
                success: false,
                message: 'Error Category not empty.',
            })
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

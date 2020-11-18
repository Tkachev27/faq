const Log = require('../models/log')
const errorHandler = require('../utils/errorHandler')
const moment = require('moment')

module.exports.create = async function (req, res) {
    try {
        let newlog = req.body
        newlog.date = moment().format('DDMMYYYY-HHmmss')
        newlog.userId = req.user._id
        const log = await new Log(newlog).save()

        res.status(201).json(log)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function (req, res) {
    try {
        const logs = await Log.find()
        res.status(200).json(logs)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Log.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Log delated.',
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

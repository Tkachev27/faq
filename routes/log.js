const express = require('express')
const passport = require('passport')
const controller = require('../controllers/log')
const router = express.Router()

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.create
)
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.getAll
)

router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.remove
)

module.exports = router

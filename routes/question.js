const express = require('express')
const passport = require('passport')
const controller = require('../controllers/question')
const router = express.Router()

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.create
)
router.get('/all/:id', controller.getAll)
router.get('/:id', controller.getById)

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.remove
)
router.patch(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.update
)

module.exports = router

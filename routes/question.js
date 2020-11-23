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
router.get(
    '/alllist',
    passport.authenticate('jwt', { session: false }),
    controller.alllist
)

router.get(
    '/user/:id',
    passport.authenticate('jwt', { session: false }),
    controller.getByIdUser
)
router.get(
    '/find/:id',

    controller.getByFind
)
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

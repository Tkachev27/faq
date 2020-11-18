const express = require('express')
const passport = require('passport')
const controller = require('../controllers/category')
const router = express.Router()

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.create
)
router.get('/', controller.getAll)

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

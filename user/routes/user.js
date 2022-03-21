const express = require('express')
const authenticatedMiddleware = require('../middleware/auth')
const {user} = require('../controllers')
const router = express.Router()

router.route('/register').post(user.register)
router.route('/login').post(user.login)
router.route('/profile').get(authenticatedMiddleware,user.userDetail)

module.exports = router
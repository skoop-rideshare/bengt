const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/rides', require('./rides'))
router.use('/matches', require('./matches'))

module.exports = router

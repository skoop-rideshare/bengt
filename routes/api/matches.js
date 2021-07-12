const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../auth')
const RideMatch = mongoose.model('RideMatch')

// Gets matches for user
router.get('/', auth.required, async (req, res) => {
  const { payload: { id } } = req
  const requests = await RideMatch.find({ users: id })
  res.status(200).json(requests)
})

module.exports = router

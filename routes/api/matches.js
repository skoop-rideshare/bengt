const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../auth')
const RideMatch = mongoose.model('RideMatch')
const getCoordinates = require('../../lib/geocoder')

// Gets requests for user
router.get('/', auth.required, async (req, res, next) => {
  const { payload: { id } } = req
  const requests = await RideMatch.find({ user: id })
  return res.status(200).json(requests)
})

module.exports = router

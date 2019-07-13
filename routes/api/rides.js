const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../auth')
const RideRequests = mongoose.model('RideRequests')

// Gets requests for user
router.get('/', auth.required, async (req, res, next) => {
  const { payload: { id } } = req
  const requests = await RideRequests.find({ user: id })
  return res.status(200).json(requests)
})

// Create ride request
router.post('/create', auth.required, async (req, res, next) => {
  const { payload: { id }, body: { rideRequest } } = req

  if (!rideRequest.fromAdress) {
    return res.status(422).json({
      fromAdress: 'is required'
    })
  }

  if (!rideRequest.toAdress) {
    return res.status(422).json({
      toAdress: 'is required'
    })
  }
  const finalRequest = new RideRequests({ user: id, ...rideRequest })
  console.log(finalRequest)

  return finalRequest.save().then(() => res.json({ finalRequest }))
})

module.exports = router

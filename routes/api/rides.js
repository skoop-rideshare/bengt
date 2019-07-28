const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../auth')
const RideRequests = mongoose.model('RideRequests')
const getCoordinates = require('../../lib/geocoder')

// Gets requests for user
router.get('/', auth.required, async (req, res, next) => {
  const { payload: { id } } = req
  const requests = await RideRequests.find({ user: id })
  return res.status(200).json(requests)
})

const extractCordinates = data => { return { lat: data.lat, lon: data.lon } }

// Create ride request
router.post('/create', auth.required, async (req, res, next) => {
  const { payload: { id }, body: { rideRequest } } = req
  const { toAdress, fromAdress } = rideRequest

  if (!fromAdress) {
    return res.status(422).json({
      fromAdress: 'is required'
    })
  }

  if (!toAdress) {
    return res.status(422).json({
      toAdress: 'is required'
    })
  }

  let toCoordinates = await getCoordinates(toAdress)
  let fromCoordinates = await getCoordinates(fromAdress)

  if (toCoordinates === null) {
    return res.status(422).json({
      toAdress: 'coordinates not found for address'
    })
  }

  if (fromCoordinates === null) {
    return res.status(422).json({
      fromAdress: 'coordinates not found for address'
    })
  }
  console.log('item: ', extractCordinates(fromCoordinates.data[0]))
  const finalRequest = new RideRequests({ user: id, fromCoordinates: extractCordinates(fromCoordinates.data[0]), toCoordinates: extractCordinates(toCoordinates.data[0]), ...rideRequest })
  console.log(finalRequest)
  return finalRequest.save().then((resp) => resp.json({ finalRequest }))
})

module.exports = router

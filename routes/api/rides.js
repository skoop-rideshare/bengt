const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../auth')
const RideRequest = mongoose.model('RideRequest')
const getCoordinates = require('../../lib/geocoder')

// Gets requests for user
router.get('/', auth.required, async (req, res, next) => {
  const { payload: { id } } = req
  const requests = await RideRequest.find({ user: id })
  return res.status(200).json(requests)
})

const extractCordinates = data => { return { lat: data.lat, lon: data.lon } }

// Create ride request
router.post('/create', auth.required, async (req, res, next) => {
  const { payload: { id }, body: { rideRequest } } = req
  const { toAddress, fromAddress } = rideRequest

  if (!fromAddress) {
    return res.status(422).json({
      fromAddress: 'is required'
    })
  }

  if (!toAddress) {
    return res.status(422).json({
      toAdress: 'is required'
    })
  }

  let toCoordinates = await getCoordinates(toAddress)
  let fromCoordinates = await getCoordinates(fromAddress)

  if (toCoordinates === null) {
    return res.status(422).json({
      toAddress: 'coordinates not found for address'
    })
  }

  if (fromCoordinates === null) {
    return res.status(422).json({
      fromAddress: 'coordinates not found for address'
    })
  }
  
  const finalRequest = new RideRequest({ 
    user: id, 
    fromCoordinates: extractCordinates(fromCoordinates.data[0]),
    toCoordinates: extractCordinates(toCoordinates.data[0]),
    ...rideRequest
  })

  return finalRequest.save().then(_request => res.status(200).json({message: 'Ride request created'}))
})

module.exports = router

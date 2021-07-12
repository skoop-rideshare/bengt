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

// Accept match
router.post('/accept', auth.required, async (req, res) => {
    const { payload: { id }, body } = req
    const match = await RideMatch.findById(body.match)
    if (match.acceptedUsers.includes(id))
        throw new Error('Already accepted match')
    match.acceptedUsers.push(id)
    match.save()
    res.status(200).json({message: 'Match accepted'})
  })
  

module.exports = router

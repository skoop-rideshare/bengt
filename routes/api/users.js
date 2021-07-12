const mongoose = require('mongoose')
const passport = require('passport')
const router = require('express').Router()
const auth = require('../auth')
const User = mongoose.model('User')

// @params: body { user: { email: 'example@test.se', password: 'test' }}
router.post('/', auth.optional, async (req, res, next) => {
  const { body: { user } } = req

  if (!user.email) {
    return res.status(422).json({
      error: 'Email is required'
    })
  }

  if (!user.password) {
    return res.status(422).json({
      error: 'Password is required'
    })
  }

  const emailTaken = await User.findOne({ email: user.email })
  if (emailTaken) {
    return res.status(422).json({
      error: 'Email is already in use'
    })
  }
  const finalUser = new User(user)
  finalUser.setPassword(user.password)
  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
})

// @params: body { user: { email: 'example@test.se', password: 'test' }}
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req

  if (!user.email) {
    return res.status(422).json({
      error: 'Email is required'
    })
  }

  if (!user.password) {
    return res.status(422).json({
      error: 'Password is required'
    })
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err)
    }
    if (passportUser) {
      const user = passportUser
      user.token = passportUser.generateJWT()
      return res.json({ user: user.toAuthJSON() })
    }
    return res.status(422).json({ error: 'User does not exist' })
  })(req, res, next)
})

router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req

  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400)
      }

      return res.json({ user: user.toAuthJSON() })
    })
})

module.exports = router

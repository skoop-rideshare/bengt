const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
// Configure mongoose's promise to global promise
mongoose.promise = global.Promise

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production'

require('./db')
require('./models/User')
require('./models/RideRequest')
require('./models/RideMatch')
require('./config/passport')

// Initiate our app
const app = express()

app.use(cors())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))

app.use('/', require('./routes'))

// // Schedule jobs
require('./lib/scheduler')

app.use((error, _req, res, _next) => {
  res.status(error.status || 500)
  console.log(error)
  res.json({
    errors: {
      message: error.message,
      error: isProduction ? error : {}
    }
  })
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log('Listening on port', port))

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
dotenv.config()
// Configure mongoose's promise to global promise
mongoose.promise = global.Promise

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production'

// Initiate our app
const app = express()

// Configure our app
app.use(cors())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))

if (!isProduction) {
  app.use(errorHandler())
}

console.log('Process.env', process.env)
// Configure Mongoose
require('./db')
require('./models/Users')
require('./models/RideRequests')
require('./models/Matches')
require('./config/passport')
app.use(require('./routes'))

// Schedule jobs
require('./lib/scheduler')

// Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    })
  })
}

app.use((err, req, res) => {
  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  })
})

app.listen(8000, () => console.log('Server running on http://localhost:8000/'))

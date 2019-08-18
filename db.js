const mongoose = require('mongoose')
const server = process.env.MONGO_URL

class Database {
  constructor () {
    this._connect()
  }

  _connect () {
    mongoose.connect(server, { useNewUrlParser: true })
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error', err)
      })
  }
}

module.exports = new Database()

const mongoose = require('mongoose');
const server = process.env.MONGO_URI;

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
	console.log(server)
     mongoose.connect(server)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()
const mongoose = require('mongoose')

const { Schema } = mongoose

const RideRequestSchema = new Schema({
  fromAdress: String,
  toAdress: String,
  driver: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'Users' }
})

mongoose.model('RideRequests', RideRequestSchema)

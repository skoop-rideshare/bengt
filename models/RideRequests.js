const mongoose = require('mongoose')

const { Schema } = mongoose

const RideRequestSchema = new Schema({
  fromAdress: String,
  fromCoordinates: { lat: String, lon: String },
  toAdress: String,
  toCoordinates: { lat: String, lon: String },
  driver: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'Users' }
})

mongoose.model('RideRequests', RideRequestSchema)

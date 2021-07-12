const mongoose = require('mongoose')

const { Schema } = mongoose

const RideRequestSchema = new Schema({
  fromAddress: String,
  toAddress: String,
  fromCoordinates: { lat: String, lon: String },
  toCoordinates: { lat: String, lon: String },
  hasCar: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'Users' }
})

mongoose.model('RideRequest', RideRequestSchema)

const mongoose = require('mongoose')

const { Schema } = mongoose

const RideMatchSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  acceptedUsers: [{ type: Schema.Types.ObjectId, red: 'User'}],
  requests: [{ type: Schema.Types.ObjectId, ref: 'RideRequest' }]
})

mongoose.model('RideMatch', RideMatchSchema)

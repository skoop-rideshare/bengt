const mongoose = require('mongoose')

const { Schema } = mongoose

const RideMatchSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  requests: [[{ type: Schema.Types.ObjectId, ref: 'RideRequests' }]]
})

mongoose.model('RideMatch', RideMatchSchema)

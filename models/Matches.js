const mongoose = require('mongoose')

const { Schema } = mongoose

const MatchesSchema = new Schema({
  driver: { type: Schema.Types.ObjectId, ref: 'Users' },
  users: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
})

mongoose.model('Matches', MatchesSchema)

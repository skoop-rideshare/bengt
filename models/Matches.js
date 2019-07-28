const mongoose = require('mongoose')

const { Schema } = mongoose

const MatchesSchema = new Schema({
  driver: { type: Schema.Types.ObjectId, ref: 'Users' },
  rider: { type: Schema.Types.ObjectId, ref: 'Users' }
})

mongoose.model('Matches', MatchesSchema)

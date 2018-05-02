const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  community_id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  category: String,
  created_by: String,
  privacy: String,
  place: String,
  published: Date
}, {
  timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event

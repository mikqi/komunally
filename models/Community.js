const mongoose = require('mongoose')

const communitySchema = new mongoose.Schema({
  facebook_group_id: String,
  name: String,
  description: String,
  created_by: String,
  category: String,
  hashtags: Array,
  strength: {
    connection: String,
    funding: String,
    member: String,
    media: String,
    venue: String,
  }
}, {
  timestamps: true
})

const Community = mongoose.model('Community', communitySchema)

module.exports = Community

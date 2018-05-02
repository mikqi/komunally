const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  facebook_id: { type: String, unique: true },
  email: { type: String, unique: true },
  tokens: Array,
  profile: {
    name: String,
    first_name: String,
    last_name: String,
    link: String,
    picture: String
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User

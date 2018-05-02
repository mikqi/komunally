const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  facebook_id: String,
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

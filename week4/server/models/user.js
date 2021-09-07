const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
  username: {
      type: String,
      required: true,
      trim: true,
      required: true,
      unique: true,
      min: 13,
      max: 23
  },
  insert_date: {
      type: Date,
      default: Date.now
  },
  mod_date: {
      type: Date,
      default: Date.now
  },
  password: {
      type: String,
      required: true
  }  
})

module.exports = mongoose.model('User', userSchema)
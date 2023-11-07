const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  domain: String,
  availability: {
    type: Boolean,
    default: true,
  },
  
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  authenticationType: {
    type: Number,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);

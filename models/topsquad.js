const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const childSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  positionCode: {
    type: Number,
    required: true,
  },
});

const topsquadSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  squad: {
    type: [childSchema],
    required: true,
  },
});

module.exports = mongoose.model('Topsquad', topsquadSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const childSchema = new Schema({ id: 'string' });

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

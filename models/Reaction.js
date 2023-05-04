const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  thought: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reaction', reactionSchema);
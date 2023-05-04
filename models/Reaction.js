const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// getter method to format the timestamp on query
reactionSchema.virtual('formattedCreatedAt').get(function() {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return this.createdAt.toLocaleDateString(undefined, dateOptions);
});

module.exports = mongoose.model('Reaction', reactionSchema);
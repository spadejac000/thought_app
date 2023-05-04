const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  // reactions: [reactionSchema]
});

// getter method to format the timestamp on query
thoughtSchema.virtual('formattedCreatedAt').get(function() {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return this.createdAt.toLocaleDateString(undefined, dateOptions);
});

// virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

module.exports = mongoose.model('Thought', thoughtSchema);
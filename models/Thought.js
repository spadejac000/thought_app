const mongoose = require('mongoose');
const Reaction = require('./Reaction')

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
  reactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reaction'
  }]
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
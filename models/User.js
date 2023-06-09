const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
},
{
  toJSON: {virtuals: true}
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Create and export the User model
// const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = mongoose.model('User', userSchema);
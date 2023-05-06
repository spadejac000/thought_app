const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for getting a specific user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving user' });
    });
});

// Route for creating a new user
router.post('/', (req, res) => {
  const { username, email} = req.body;
  
  const newUser = new User({
    username,
    email
  });
  
  newUser.save()
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error creating user' });
    });
});

// Route for updating a user by ID
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  User.findByIdAndUpdate(userId, { username, email }, { new: true })
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating user' });
    });
});

// Route for deleting a user by ID
router.delete('/:id', (req, res) => {
  const userId = req.params.id;

  User.findByIdAndRemove(userId)
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json({ message: 'User deleted successfully' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error deleting user' });
    });
});

// POST route to add a friend to a user's friend list
router.post('/:userId/friends/:friendId', (req, res) => {
  const { userId, friendId } = req.params;

  // Add friendId to the user's friend list
  User.findByIdAndUpdate(userId, { $push: { friends: friendId } })
    .then(() => {
      res.status(200).json({ message: 'Friend added successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to add friend' });
    });
});

// DELETE route to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', (req, res) => {
  const { userId, friendId } = req.params;

  // Remove friendId from the user's friend list
  User.findByIdAndUpdate(userId, { $pull: { friends: friendId } })
    .then(() => {
      res.status(200).json({ message: 'Friend removed successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to remove friend' });
    });
});

module.exports = router;
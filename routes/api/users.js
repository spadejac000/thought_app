const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Route for creating a new user
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  
  const newUser = new User({
    name,
    email,
    password
  });
  
  newUser.save()
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error creating user' });
    });
});

// Route for getting all users
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving users' });
    });
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

// Route for updating a user by ID
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { new: true })
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

module.exports = router;
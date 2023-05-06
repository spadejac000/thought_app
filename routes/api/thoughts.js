const express = require('express');
const router = express.Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

// Route for creating a new thought
router.post('/', (req, res) => {
  const { thoughtText, username } = req.body;

  const newThought = new Thought({
    thoughtText,
    username
  });

  newThought
    .save()
    .then(async thought => {
      await User.findOneAndUpdate(
        { username: username }, 
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.status(201).json(thought);
    })
    .catch(error => {
      res.status(500).json({ error: error.message});
    });
});

// Route for getting all thoughts
router.get('/', (req, res) => {
  Thought.find()
    .then(thoughts => {
      res.status(200).json(thoughts);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving thoughts' });
    });
});

// Route for getting a specific thought by ID
router.get('/:id', (req, res) => {
  const thoughtId = req.params.id;

  Thought.findById(thoughtId)
    .then(thought => {
      if (!thought) {
        res.status(404).json({ error: 'Thought not found' });
      } else {
        res.status(200).json(thought);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving thought' });
    });
});

// Route for updating a thought by ID
router.put('/:id', (req, res) => {
  const thoughtId = req.params.id;
  const { thoughtText } = req.body;

  Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true })
    .then(thought => {
      if (!thought) {
        res.status(404).json({ error: 'Thought not found' });
      } else {
        res.status(200).json(thought);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating thought' });
    });
});

// Route for deleting a thought by ID
router.delete('/:id', (req, res) => {
  const thoughtId = req.params.id;

  Thought.findByIdAndRemove(thoughtId)
    .then(thought => {
      if (!thought) {
        res.status(404).json({ error: 'Thought not found' });
      } else {
        res.status(200).json({ message: 'Thought deleted successfully' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error deleting thought' });
    });
});

module.exports = router;
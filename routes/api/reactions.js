const express = require('express');
const router = express.Router();
const Reaction = require('../../models/Reaction');

// Route for creating a new reaction
router.post('/', (req, res) => {
  const { thoughtId, userId, content } = req.body;

  const newReaction = new Reaction({
    thoughtId,
    userId,
    content
  });

  newReaction
    .save()
    .then(reaction => {
      res.status(201).json(reaction);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error creating reaction' });
    });
});

// Route for getting all reactions
router.get('/', (req, res) => {
  Reaction.find()
    .then(reactions => {
      res.status(200).json(reactions);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving reactions' });
    });
});

// Route for getting reactions by thought ID
router.get('/thought/:thoughtId', (req, res) => {
  const thoughtId = req.params.thoughtId;

  Reaction.find({ thoughtId })
    .then(reactions => {
      res.status(200).json(reactions);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving reactions' });
    });
});

// Route for updating a reaction by ID
router.put('/:id', (req, res) => {
  const reactionId = req.params.id;
  const { content } = req.body;

  Reaction.findByIdAndUpdate(reactionId, { content }, { new: true })
    .then(reaction => {
      if (!reaction) {
        res.status(404).json({ error: 'Reaction not found' });
      } else {
        res.status(200).json(reaction);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating reaction' });
    });
});

// Route for deleting a reaction by ID
router.delete('/:id', (req, res) => {
  const reactionId = req.params.id;

  Reaction.findByIdAndRemove(reactionId)
    .then(reaction => {
      if (!reaction) {
        res.status(404).json({ error: 'Reaction not found' });
      } else {
        res.status(200).json({ message: 'Reaction deleted successfully' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error deleting reaction' });
    });
});

module.exports = router;
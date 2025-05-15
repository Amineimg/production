const express = require('express');
const Book = require('../models/book');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des livres' });
  }
});

router.post('/', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé' });
  }

  try {
    const book = new Book({ ...req.body, userId: req.user._id });
    await book.save();
    res.status(201).json(book); // Return the created book with a 201 status
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création du livre' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du livre' });
  }
});
router.put('/:id', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé' });
  }

  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated book
    );

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    res.json(book);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du livre' });
  }
});

router.delete('/:id', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé' });
  }

  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    res.json({ message: 'Livre supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du livre' });
  }
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, role: role || 'user' });
  await user.save();
  res.json({ message: 'Utilisateur créé' });
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.token = token;
  await user.save();

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, 
    sameSite: 'Lax',
    path: '/', 
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ message: 'Connexion réussie'  ,token });
});

router.post('/logout', async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  console.log('Token:', token);

  try {
    const user = await User.findOne({ token });
    if (user) {
      user.token = null;
      await user.save();
    }
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/', 
    });
    res.json({ message: 'Déconnecté', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la déconnexion' });
  }
});

module.exports = router;

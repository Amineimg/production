const User = require('../models/user');

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).json({ message: 'Token invalide' });
  }
  req.user = user; // ممكن تمرر بيانات المستخدم للخطوات الموالية
  next();
}

module.exports = authMiddleware;

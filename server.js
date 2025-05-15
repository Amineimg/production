const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

require('./controllers/db')
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
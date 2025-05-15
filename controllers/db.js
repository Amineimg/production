const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Production',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connecté'))
.catch(err => console.error(err));

module.exports = mongoose;

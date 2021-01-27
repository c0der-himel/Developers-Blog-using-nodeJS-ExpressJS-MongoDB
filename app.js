const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Routes
const authRoute = require('./routes/authRoute');

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// MiddleWare Array
const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({ extended: true }),
  express.json(),
];

app.use(middleware);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
  res.json({ message: '👋 Hello, nodeJS 🔥' });
});

const PORT = process.env.PORT || 3000;
const adminPassword = 'admin123';
const dbName = 'tech-blog';
const URI = `mongodb+srv://tech-blog-admin:${adminPassword}@nodejs.2gw6h.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database Connected');
    app.listen(PORT, () => {
      console.log(`Server is running of PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    return console.log(err);
  });

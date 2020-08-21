const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//use .env file
require('dotenv').config();

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/user', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const connectionString = process.env.MONGO_CONNECTION_STRING;
// console.log(connectionString)

mongoose
  .connect(connectionString)
  .then((result) => {
    app.listen(process.env.PORT || 3001);
  })
  .catch((err) => {
    console.log(err);
  });

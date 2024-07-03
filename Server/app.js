const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const url = "mongodb+srv://juli0059:SxtG3Mwh79xNWvzG@cluster0.xar1z07.mongodb.net/cartoonopia?retryWrites=true&w=majority&appName=Cluster0";;
app.use(cors());
app.use(express.json());

const loginRoutes = require('./routes/Login.route');
const signupRoutes = require('./routes/Signup.route');
app.use('/api/login', loginRoutes);
app.use('/api/Signup', signupRoutes);
app.use(express.static(path.join(__dirname, '../build')));
app.on('error', (err) => {
  console.log('Server error', err);
});

mongoose.connect(url)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  }).catch((err) => {
    console.log("Connection failed", err);
  });


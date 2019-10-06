const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
//routes
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
//mongoDB URL
const mongodbKey = require("./config/keys").mongodbKey;

//connect to mongoDB
mongoose.connect(mongodbKey)
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err));

const app = express();

// support parsing of application/json type posts data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded posts data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profiles);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
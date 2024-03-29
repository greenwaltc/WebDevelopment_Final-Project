const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// setup express
const app = express();

// setup body parser middleware to convert to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/final', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: [
        'secretValue'
    ],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));


// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

const collections = require("./collections.js");
app.use("/api/collections", collections.routes);

const recipes = require("./recipes.js");
app.use("/api/recipes", recipes.routes);

// const photos = require("./photos.js");
// app.use("/api/photos", photos.routes);

// const comments = require("./comments.js");
// app.use("/api/comments", comments.routes);

app.listen(3002, () => console.log('Server listening on port 3002!'));
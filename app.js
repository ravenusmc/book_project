//Requiring all of the packages
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

//Setting up the constant variable which will be set equal to express.
const app = express();

/////////////// Code for the Model ////////////

//Code for the model
mongoose.connect('mongodb://localhost/book');
let db = mongoose.connection;

//Bringing in model
let Book = require('./models/book');

//Checking for DB errors
db.on('error', function(err){
  console.log(err);
});

//Checking connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

//////////// End Code for the Model /////////////

//loading view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Setting up public folder 
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Express Sessions code
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express validation middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Home route 
app.get('/', function(req, res){
    res.render('index', {
        title: 'Home Page'
    });
});

//Route files 
let books = require('./routes/books');
let users = require('./routes/users');
app.use('/books', books);
app.use('/users', users);

//Code to start the server.
app.listen(3000, function(){
  console.log('Server Started on port 3000...')
});









































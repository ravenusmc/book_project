//Requiring all of the packages
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

//ROUTES 

//Home route 
app.get('/', function(req, res){
    res.render('index', {
        title: 'Home Page',
        books: books
    });
});

//route to book page
app.get('/book', function(req, res){
      Book.find({}, function(err, books){
        res.render('book', {
          title: 'Home Page',
          books: books
        });
      });
});

//Get single Book
app.get('/book/:id', function(req,res){
  Book.findById(req.params.id, function(err, book){
    res.render('edit_book', {
      book: book
    });
  });
});

//route to add book page
app.get('/book/add', function(req, res){
    res.render('add_book', {
      title: 'Add Book'
    });
});

app.post('/book/add', function(req, res){

  let book = new Book();

  book.title = req.body.title;
  book.author = req.body.author;
  book.body = req.body.body;

  book.save(function(err){
    if(err){
      console.log(err);
      return;
    }else {
      res.redirect('/book')
    }
  });

});

//END OF ROUTES 

//Route files 
let books = require('./routes/books');
app.use('/books', books);

//Code to start the server.
app.listen(3000, function(){
  console.log('Server Started on port 3000...')
});









































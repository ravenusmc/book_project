const express = require('express');
const router = express.Router();

//Bringing in Book model
let Book = require('../models/book');
//User model
let User = require('../models/user');

//route to book page
router.get('', ensureAuthenticated, function(req, res){

  Book.find({}, function(err, books){
    res.render('book', {
      title: 'Home Page',
      books: books
    });
  });

});

//route to add book page
router.get('/add', ensureAuthenticated, function(req, res){
    let errors = null;
    res.render('add_book', {
      errors: errors
    });
});

router.post('/add', function(req, res){

  req.checkBody('title','Title is required').notEmpty();
  req.checkBody('author','Author is required').notEmpty();
  req.checkBody('body','Body is required').notEmpty();

  //Getting the Errors
  let errors = req.validationErrors();

  if (errors){
    res.render('add_book', {
      errors: errors
    });
  } else{
      let book = new Book();

      book.title = req.body.title;
      book.author = req.body.author;
      book.body = req.body.body;

      book.save(function(err){
        if(err){
          console.log(err);
          return;
        }else {
          req.flash('success','Book Added')
          res.redirect('/books')
        }
      });

  }
});

//Get single Book
router.get('/:id', ensureAuthenticated, function(req,res){
  Book.findById(req.params.id, function(err, book){
    res.render('edit_book', {
      book: book
    });
  });
});

//Load Edit form for single Book
router.get('/edit/:id', ensureAuthenticated, function(req,res){
  Book.findById(req.params.id, function(err, book){
    res.render('edit_form_book', {
      title: 'Edit Book Page',
      book: book
    });
  });
});

//Post for edit page
router.post('/edit/:id', function(req, res){

  let book = {};

  book.title = req.body.title;
  book.author = req.body.author;
  book.body = req.body.body;

  let query = {_id:req.params.id}

  Book.update(query, book, function(err){
    if(err){
      console.log(err);
      return;
    }else {
      req.flash('success', 'Book Updated')
      res.redirect('/books')
    }
  });
});

router.delete('/:id', function(req, res){

  let query = {_id:req.params.id}

  Book.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

//Access Control 
function ensureAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login')
  }
}

module.exports = router;
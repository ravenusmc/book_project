//Requiring all of the packages
const express = require('express');
const path = require('path');

//Setting up the constant variable which will be set equal to express.
const app = express();

//loading view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Setting up public folder 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home Page'
  });
});

//Code to start the server.
app.listen(3000, function(){
  console.log('Server Started on port 3000...')
});

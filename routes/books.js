const express = require('express');
const router = express.Router();


router.get('/book', function(req,res){
  res.render('book')
});


module.exports = router;
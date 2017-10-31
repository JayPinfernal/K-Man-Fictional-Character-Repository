const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');
const Entry = mongoose.model('entries');
const User = mongoose.model('users');
router.get('/',ensureGuest, (req, res) => {
  res.render('index/landing')
});

router.get('/dashboard', ensureAuthenticated,(req,res) => {
Entry.find({
  user:req.user.id
}).then(entries => {
    res.render('index/dashboard',{
      entries: entries
    })
})

})
router.get('/about',(req,res) => {
  res.render('index/about');
})

module.exports = router;

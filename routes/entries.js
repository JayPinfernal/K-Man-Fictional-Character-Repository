const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
  res.render('entries/indexlist')
});

router.get('/add', (req, res) => {
  res.render('entries/add')
});

router.get('/edit', (req, res) => {
  res.render('entries/edit')
});

router.get('/view', (req,res) => {
  res.render('entries/display');
}
)

module.exports = router;

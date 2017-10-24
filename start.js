const express = require('express');
const mongoose= require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser =require('body-parser');

const app = express();
//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//some demo code for now
app.get('/demo', (req, res) => {
  res.render('myDemo');
});

app.post('/doStuff', (req, res) => {
  //console.log(req.body.hide);
   console.log('this is a response');
   console.log(req.body);
  res.render('myview',{
    info:req.body.datval
  });
});

const port =process.env.PORT || 5523;

app.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});
app.get('/', (req, res) => {
  res.send('This is the official KFCR application and it has just begun');
});

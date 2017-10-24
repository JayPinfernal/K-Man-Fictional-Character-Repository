const express = require('express');
const mongoose= require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser =require('body-parser');
const cookieParser= require('cookie-parser');
const session= require('express-session');
const passport = require('passport');
const impkeys = require('./configs/impkeys');

const app = express();
//Load Models
require('./models/User')

//Passport configs
require('./configs/passport')(passport);



//Load routes
const index= require('./routes/index');
const gauth= require('./routes/gauth');

//Session middleware
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Global Variables

app.use((req,res,next) => {
  res.locals.user = req.user || null;
  next();
});

//set mongoose promises
mongoose.Promise =global.Promise;
//Mongoose Connect
mongoose.connect(impkeys.mongoURI,{
  useMongoClient :true
})
.then(() => {
  console.log("mongoDB connected ")
})
.catch(err => {
  console.log(err);
})


//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//some demo code for now


//Use the routes
app.use('/gauth', gauth);
app.use('/', index);

const port =process.env.PORT || 5523;

app.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});

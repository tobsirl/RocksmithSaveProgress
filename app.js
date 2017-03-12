var express = require('express');
var routes = require('./routes');
var router = require('./router');
var progress = require('./routes/progress');
var bodyParser = require('body-parser');
var logger = require('morgan');
var bcrypt = require('bcrypt-nodejs');

var passport = require('passport');
var passportService = require('./config/passport');


var AuthenticationController = require('./controllers/authentication');

//create an express app
var app = express();
//require mongoose as a module
var mongoose = require('mongoose');
//require the config file main.js
var config = require('./config/main');

//Attempt to clear up the express deprecated messages in the console log
mongoose.Promise = require('bluebird');
// Connect to the database
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	
  // we're connected!
  console.log("We're Connected")
});
  

//configure the express app to parse JSON-formatted body
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


//create routing object
//var routes = require('./routes/index');
//app.get('/', routes.index);
// Middleware to require login/auth
var requireAuth = passport.authenticate('jwt', { session: false });
var requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {  
  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

// Set url for API group routes
  app.use('/api', apiRoutes);
};
//Add routes for progress api
app.get('/progress',progress.index);
app.get('/progress/:id',progress.show);
app.post('/progress',progress.create);
app.put('/progress/:id',progress.update);
app.delete('/progress/:id',progress.delete);

//add route for the root

app.get('/',function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("We're up and running!!!");
});

// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(config.port)
// Put a friendly message on the terminal
console.log("Server running at port " + config.port);

// Import routes to be served
router(app);



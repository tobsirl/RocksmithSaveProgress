var express = require('express');
var routes = require('./routes');
var progress = require('./routes/progress');
var bodyParser = require('body-parser');

var jwt = require('express-jwt');
var jwksRsa = require('jwks-rsa');
var cors = require('cors');
var jwks = require('jwks-rsa');
require('dotenv').config();
//create an express app
var app = express();
//require mongoose as a module
var mongoose = require('mongoose');
//require the config file main.js
var config = require('./config/main');


app.use(cors());



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

 app.use(jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://tobsirl.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: 'http://RocksmithSaveProgress.com',
  issuer: 'https://tobsirl.eu.auth0.com/',
  algorithms: [ 'RS256' ]
}));

//middleware to check scopes
const checkPermissions = function(req, res, next){
  switch(req.path){
    case '/progress':{
      var permissions = ['index:progress'];
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.status(403).send({message:'Forbidden Token'});
        }
      }
      break;
    }
  }
}
//enable the use of the checkPermissions middleware
app.use(checkPermissions);




//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//create routing object
//var routes = require('./routes/index');
//app.get('/', routes.index);

//add route for the root

app.get('/', function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("We're up and running!!!");
});


//Add routes for progress api
app.get('/progress',progress.index);
app.get('/progress/:id',progress.show);
app.post('/progress',progress.create);
app.put('/progress/:id',progress.update);
app.delete('/progress/:id',progress.delete);



// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(config.port)
// Put a friendly message on the terminal
console.log("Server running at port " + config.port);

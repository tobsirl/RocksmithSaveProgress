var express = require('express');
var routes = require('./routes');
var progress = require('./routes/progress');
var bodyParser = require('body-parser');
//create an express app
var app = express();
//require mongoose as a module
var mongoose = require('mongoose');
//require the config file main.js
var config = require('./config/main');


// Connect to the database


mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	
  // we're connected!
  console.log("We're Connected")
});
  

//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());


//create routing object
//var routes = require('./routes/index');
//app.get('/', routes.index);

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

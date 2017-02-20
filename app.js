var express = require('express');
var routes = require('./routes');
var bodyParser = require('body-parser');
//create an express app
var app = express();

var mongoose = require('mongoose');


// Connect to the database
mongoose.connect('mongodb://test:ewd15@ds149489.mlab.com:49489/contacts_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	
  // we're connected!
  console.log("We're Connected")
});
  

	

//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());
// all environments
app.get('/books', function(req,res){
	console.log('Getting all data');
})


//create routing object
//var routes = require('./routes/index');
//Add routes for progress api
//app.get('/progress',progress.index);
//app.post('/progress',progress.create);
//app.put('/progress:id',progress.update);
//app.delete('/progress:id',progress.delete);

//add route for the root
app.get('/',function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("We're up and running!!!");
});
// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(8000)
// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");

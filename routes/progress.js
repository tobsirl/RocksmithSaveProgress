//Progress routes

var Songprogress = require('../models/songprogress');
var bodyParser = require('body-parser');

//get a list of all Songs
exports.index = function(req, res) {
  Songprogress.find({}, function(err, song) {
    if(!err) {
      res.json(200, { songprogress: song });  
    } else {
      res.json(500, { message: err });
    }
  });
}

// Creates a new Song Progress in datastore.
exports.create = function(req, res) {
	var songname = req.body.songname;
	var artist = req.body.artist;
	var difficulty = req.body.difficulty;
	var speed = req.body.speed;

	Songprogress.findOne({ songName: { $regex: new RegExp(songname, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var newSongprogress = new Songprogress(); 

      newSongprogress.songName = songname; 
      newSongprogress.artistName = artist; 
      newSongprogress.difficulty = difficulty;
      newSongprogress.speed = speed;
      
      newSongprogress.save(function(err) {

        if(!err) {
          res.json(201, {message: "Song created with name: " + newSongprogress.songName });    
        } else {
          res.json(500, {message: "Could not create song. Error: " + err});
        }

      });

    } else if(!err) {
      
      // User is trying to create a workout with a name that already exists. 
      res.json(403, {message: "That song already exists, please update instead of create or create a new workout with a different name."}); 

    } else {
      res.json(500, { message: err});
    } 
  });

}

	

// Update an existing song in database.
exports.update = function(req, res) {
	res.json(200, { message: "Put"});
};

// delete an existing song in the database.
exports.delete = function(req, res) {
	res.json(200, { message: "Delete"});
};


//exports.index = function(req, res) {
 // res.json(200, { message: "My first route"});
//}
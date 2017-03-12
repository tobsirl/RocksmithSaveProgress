//Progress routes

var Songprogress = require('../models/songprogress');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

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
/*
router.get('/progress', 
  function(req, res){
    Songprogress.find({}), function(err, song){
      if(!err){
        res.json(200, { songprogress: song});
      }else {
        res.json(500, { message: err});
    }
  };
  
});
*/

//show a specific song
exports.show = function(req, res){
  var id = req.params.id; 
    Songprogress.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading Song." + err});
    } else {
      res.json(404, { message: "Song not found."});
    }
  });

};

// Creates a new Song Progress
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
      
      // User is trying to create a song with a name that already exists. 
      res.json(403, {message: "That song already exists, please use update"}); 

    } else {
      res.json(500, { message: err});
    } 
  });

}

  

// Update an existing song in database.
exports.update = function(req, res) {
  var id = req.params.id; 
    var songname = req.body.songname;
    var artist = req.body.artist;
    var difficulty = req.body.difficulty;
  var speed = req.body.speed;

    Songprogress.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.songName = songname; 
        doc.artistName = artist; 
        doc.difficulty = difficulty;
        doc.speed = speed;

        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Song updated: " + songname});    
          } else {
            res.json(500, {message: "Could not update song. " + err});
          }  
        });
      } else if(!err) {
        res.json(404, { message: "Could not find song."});
      } else {
        res.json(500, { message: "Could not update song." + err});
      }
    }); 

};

// delete an existing song in the database.
exports.delete = function(req, res) {
  var id = req.params.id; 
    Songprogress.findById(id, function(err, doc) {
      if(!err && doc) {
          doc.remove();
          res.json(200, { message: "Song removed."});
      } else if(!err) {
      res.json(404, { message: "Could not find song."});
      } else {
          res.json(403, {message: "Could not delete song. " + err });
    }
  });
};

module.exports = router;


//exports.index = function(req, res) {
 // res.json(200, { message: "My first route"});
//}
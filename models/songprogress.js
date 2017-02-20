// Set up Song Progress Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new Schema({
	songName: {type: String},
	artistName: {type: String},
	difficulty: {type: Number},
	speed: {type: Number},
	dateCreated: {type: Date, required: true, default: Date.now}

});

module.exports = mongoose.model('songprogress', songSchema);

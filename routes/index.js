var express = require('express');
var passport = require('passport');
var router = express.Router();
var Songprogress = require('../models/songprogress');
var bodyParser = require('body-parser');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8000/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rocksmith Save Progress', env: env });
});

router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });
/*
router.get('/progress', 
  function(req, res){
    Songprogress.find({}), function(err, song){
      if(!err){
        res.json(200, { songprogress: song});
      }else {
        res.json(500, { message: err});
    }
  }  
});
*/
router.get('/progress', ensureLoggedIn,
  function(req, res){
    res.json("We are here");
    Songprogress.find({}), function(err, song){
      if(!err){
        res.json(200, { songprogress: song});
      }else {
        res.json(500, { message: err});
    }
  }  
  });


module.exports = router;

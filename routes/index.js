// var express = require('express');
// var router = express.Router();
// could use one line instead: 
var router = require('express').Router();
var tweetBank = require('../tweetBank');
var fs = require("fs");

router.use("/", function(req, res, next) {
	var file = process.cwd() + "/public" + req.path;
	fs.readFile(file, function(err, data) {
		if (err) {
			next();
		}
		else {
			res.sendFile(file);
			next();
		}
	});
});

router.get('/users/:name', function(req, res, next) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: list } );
  next();
});

router.get('/users/:name/tweets/:id', function(req, res, next) {
  var name = req.params.name;
  var id = req.params.id;
  var list = tweetBank.find( {name: name, id: id} );
  res.render( 'index', { title: 'Twitter.js - Post by ' + name, tweets: list } );
  next();
});

router.get('/', function (req, res, next) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
  next();
});

// router.use("/stylesheets", function(req, res, next) {
// 	fs.readFile(__dirname + "/../public/stylesheets" + req.path, function(err, content) {
// 		if (err) throw err;
// 		else {
// 			res.send(content);
// 			next();
// 		}
// 	});

// });


module.exports = router;


// var express = require('express');
// var router = express.Router();
// could use one line instead: 
var router = require('express').Router();

var bodyParser = require('body-parser');

var tweetBank = require('../tweetBank');
var fs = require("fs");
var chalk = require('chalk');


module.exports = function (io) {

  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

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
    res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: list, showForm: true, name: name } );
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
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
    next();
  });

  router.post('/submit', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    var id = tweetBank.add(name, text);
    io.sockets.emit('new_tweet', {name: name, text: text, id: id});
    res.redirect('/');
  });

  router.use(function(request, response, next) {

    // var people = [{name: 'Full'}, {name: 'peoooep'}, {name: 'Son'}];
    // response.render( 'index', {title: 'Hall of Fame', people: people} );

    console.log(chalk.bold.red(request.method) + 
      ' ' + chalk.blue(request.path) + ' ' + chalk.bold.green(response.statusCode)
    );
  });


  return router;
}

// router.use("/stylesheets", function(req, res, next) {
// 	fs.readFile(__dirname + "/../public/stylesheets" + req.path, function(err, content) {
// 		if (err) throw err;
// 		else {
// 			res.send(content);
// 			next();
// 		}
// 	});

// });





var express = require('express');
var chalk = require('chalk');
var swig = require("swig");
var fs = require("fs");

var app = express();
swig.setDefaults({ cache: false });

//check if problemm .__express
app.engine('html', swig.renderFile);

app.set('view engine', 'html');

app.set('views', __dirname + '/views')




// at end because log needs response
app.use(function(request, response, next) {

  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  response.render( 'index', {title: 'Hall of Fame', people: people} );

  console.log(chalk.bold.red(request.method) + 
    ' ' + chalk.blue(request.path) + ' ' + chalk.bold.green(response.statusCode)
  );
});

































app.listen(3001, function() {
  console.log("My shit is ready on port 3001...")
});
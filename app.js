var express = require('express');
var chalk = require('chalk');

var app = express();








// at end because log needs response
app.use(function(request, response, next) {

  response.send("You are really cool. Because .. just because.");

  console.log(chalk.bold.red(request.method) + 
    ' ' + chalk.blue(request.path) + ' ' + chalk.bold.green(response.statusCode)
  );
});

































app.listen(3001, function() {
  console.log("My shit is ready on port 3001...")
});
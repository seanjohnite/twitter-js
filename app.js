var express = require('express');
var swig = require("swig");
var fs = require("fs");
var routes = require("./routes/");
var socketio = require('socket.io');

var app = express();
swig.setDefaults({ cache: false });

//check if problemm .__express
app.engine('html', swig.renderFile);

app.set('view engine', 'html');

app.set('views', __dirname + '/views')

var server = app.listen(3001, function() {
  console.log("My shit is ready on port 3001...")
});

var io = socketio.listen(server);

app.use("/", routes(io));





// at end because log needs response


































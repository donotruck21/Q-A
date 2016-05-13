var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/client/views')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);






// Setting our Server to Listen on Port: 8000
app.listen(8008, function() {
    console.log("lulz 8008....");
});
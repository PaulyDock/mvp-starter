var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
// var items = require('../database-mongo');

var $ = require('jQuery');
var utils = require('./express-utils');

var app = express();

console.log('items from index.js on server: ', items);
// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});


app.post('/items', function (req, res) {
  $.ajax({
    url: 'http://xkcd.com/614/info.0.json',
    type: 'GET',
    success: function(data) {
      console.log(data);
    },
    error: function(err) {
      console.error(err);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


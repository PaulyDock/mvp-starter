var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
// var items = require('../database-mongo');

var $ = require('jquery');
var request = require('request');
var utils = require('./express-utils');
var options = {
  method: 'GET',
  host: 'xkcd.com',
  path: '/614/info.0.json'
//  url: 'http://xkcd.com/614/info.0.json'
};
var queryString = "SELECT * from items";


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

app.post('/', function (req, res) {
  let stripNumber = '';
  req.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    stripNumber += chunk;
  }).on('end', function() {
    stripNumber = stripNumber.toString();
    stripNumber = stripNumber.split('=')[1];
    console.log('stripNumber: ', stripNumber);
    options.url = `http://xkcd.com/${stripNumber}/info.0.json`;
    console.log('options: ', options);
    request(options, function(error, response, body) {
      if (error) { console.error(error); }
      //body = JSON.parse(body);
      console.log('body from xkcd: ', body);
      if (body) {
        res.status(200).send(body);
        // console.log(body);
      } else {
        res.status(404).send('no strip for number: ' + stripNumber + ' body' + body);
      }
    });
  })
  // $.ajax({
  //   url: 'http://xkcd.com/614/info.0.json',
  //   type: 'GET',
  //   success: function(data) {
  //     console.log(data);
  //   },
  //   error: function(err) {
  //     console.error(err);
  //   }
  // });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


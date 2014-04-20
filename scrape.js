var request = require('request');
var cheerio = require('cheerio');

var express = require('express');
var app     = express();

app.use(express.bodyParser());

app.post('/search', function(req, res) {
  document.write('You sent the name "' + req.body.search_query + '".');
});





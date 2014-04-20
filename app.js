
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');

var request = require('request');
var cheerio = require('cheerio');

var http = require('http');
var path = require('path');

var app = express();



// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.bodyParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/search', function(req,res){
  var sim = req.body.search_q;
  console.log("request query",sim);
  request('https://www.youtube.com/results?search_query='+req.body.search_q, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var query_data;
    $('table.watch-card-list td:first-child').each(function(i, element){
      var title = $(this).children('a').text();
	  var link = $(this).children('a').attr('href');
      console.log(title+" : "+link);
      query_data = JSON.stringify({"title":title, "link":link});
	  });
  }
});
  res.render('index', { response: sim, title: 'Museek Vidz',
					  song_list:query_data});
})
var global_id ;
app.get('/:id', function(req,res){
var query_data=new Array();
  var message='hello';
  global_id = req.param('id');
  console.log('input param',global_id);
  console.log('https://www.youtube.com/results?search_query='+global_id);
  request('https://www.youtube.com/results?search_query='+global_id, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
      $('table.watch-card-list td:first-child').each(function(i, element){
      var title = $(this).children('a').text();
	  var link = $(this).children('a').attr('href');
      //console.log(title+" : "+link);
      //query_data.push(JSON.stringify({song_name:title, link_to:link}));
      query_data.push({song_name:title, link_to:link});
       
      //console.log("inside",query_data);
	  });
	  //console.log("inside",query_data);
	  list_display(query_data);
  }
});
  //console.log("outside:",query_data);
  function list_display(input){
   console.log('input length',input.length);
   /*if(input.length<1){
   input="Oops!! Youtube does not have a Music mix for this artist, how about we take you ";
   input+="to their videos!";  
   res.render('music', { response: 'input query-justin timberlake', title: 'Express',
            song_list:input});
   }*/
  //else{
    res.render('music', { response: global_id, title: 'Museek VidZ',sub_title:'A project built with Node/Express/Jade',
					  song_list:input});
    //}
 console.log("response message",input);
  
  }
  
  
  
  
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

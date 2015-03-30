var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var redis = require('redis');
var redis_client = redis.createClient();
var moment=require('moment');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 1234);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

/*var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})*/

/*
var getRequestHandler = function (req, res) {
  console.log('Got HTTP GET Request');
  res.writeHeader(200, { 'Content-Type': 'text/html' });
  if(req.url === '/'){
    res.write(fs.readFileSync('client.html'));
    res.end();
  }else if(req.url === '/login'){
    res.write(fs.readFileSync('login.html'));
    res.end();
  }else if(req.url.toString().includes('/gallery')){
    res.write(fs.readFileSync(req.url.toString()));
    res.end();
  }else if(req.url === '/gallery/Animated_Dancing_Bird_Cute-1yelsm.gif'){
    res.write(fs.readFileSync('gallery/Animated_Dancing_Bird_Cute-1yelsm.gif'));
    res.end();
  }
  
};

var postRequestHandler = function (req, res) {
  console.log('Got HTTP POST Request to ' + req.url);

  if (req.url === '/push') {

    var post_request_body = '';

    req.on('data', function (data) {
      post_request_body += data;
    });

    req.on('end', function (data) {
      var x=JSON.parse(post_request_body)
      x[2]=moment().format();
      console.log(moment().format());
      post_request_body=JSON.stringify(x);
      redis_client.lpush('all:comments', post_request_body, function(err, repl){
        if (err) {
          res.writeHeader(500, { 'Content-Type': 'text/plain' });
          res.write('Internal Server Error');
          res.end();
        } else {
          res.writeHeader(200, { 'Content-Type': 'text/html' });
          res.write('OK');
          res.end();
        }
      });
    });

  } else if (req.url === '/retrieve') {

    redis_client.lrange('all:comments', 0, -1, function(err, repl){
      if (err) {
        console.log('Error when reading from Redis', err);
        res.writeHeader(500, { 'Content-Type': 'text/plain' });
        res.write('Internal Server Error');
        res.end();
      } else {
        res.writeHeader(200, { 'Content-Type': 'application/javascript' });
        res.write(JSON.stringify(repl));
        res.end();
      }
    });

  }
};

var server = http.createServer(function (req, res) {
  if (req.method === 'GET') {
    getRequestHandler(req, res);
  } else if (req.method === 'POST') {
    postRequestHandler(req, res);
  }
});*/

console.log('Server waiting for connection at http://127.0.0.1:1234/');
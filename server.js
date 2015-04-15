var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path    = require("path");
var http = require('http');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = module.exports = express();
var redis = require('redis');
redis_client = redis.createClient();

// view engine setup
app.set('trust proxy', 'loopback');
app.set('views', __dirname + '/views');
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1")
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.use('/', routes);
app.use('/users', users);

app.get('/', function (req, res) {
  res.sendfile('views/client.html');
});
app.get('/login', function (req, res) {
  res.sendfile('views/login.html');
});

app.post('/retrieve', function (req, res){
  console.log('Got HTTP POST Request to ' + req.url);
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
});
app.post('/push', function (req, res){
  console.log('Got HTTP POST Request to ' + req.url);
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
});

app.get('*', function(req,res){
 res.sendfile('views/client.html');
});


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

var server = app.listen(app.get('port'), app.get('ipaddress'),function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
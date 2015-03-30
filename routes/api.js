var redis = require('redis');
var redis_client = redis.createClient();

exports.retrieve = function (req, res) {

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
};

exports.push = function(req, res){

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
}
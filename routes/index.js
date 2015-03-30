var express = require('express');
var router = express.Router();

exports.index = function(req, res){
	res.sendfile('client.html');
};

module.exports = router;

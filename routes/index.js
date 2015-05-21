
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index');
};

exports.googlemap = function(rep, res){
	res.render('googlemap');
};

exports.d3circle = function(rep, res){
	res.render('d3circle');
};
var mongoose = require('mongoose');
var User = mongoose.model('User');

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};
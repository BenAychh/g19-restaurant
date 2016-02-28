var pg = require('pg');
var escape = require('pg-escape');
var query = require('./databaseInterface.js');
function applyChanges(req, res) {
  var restaurantID = req.params.restaurant;
  var queryString = 'DELETE from restaurants ' +
    'where id=' + restaurantID;
  query(queryString, '', function(error, results) {
    res.redirect('/');
  });
}
module.exports = applyChanges;

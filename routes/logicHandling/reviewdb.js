var query = require('./databaseInterface.js');
var escape = require('pg-escape');
function getReviews(callback, res, parameters) {
  var queryString = 'select * from reviews';
  var first = true;
  if (parameters) {
    var parameterKeys = Object.keys(parameters);
    parameterKeys.forEach(function(key) {
      if (first) {
        queryString += ' WHERE ';
        first = false;
      } else {
        queryString += ' AND ';
      }
      queryString += escape('reviews.%I = %L', key, parameters[key] + '');
    });
  }
  queryString += ';';
  console.log(queryString);
  query(queryString, '', function(err, results) {
    callback(res, results.rows);
  });
}
module.exports = getReviews;

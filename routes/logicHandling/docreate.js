var pg = require('pg');
var escape = require('pg-escape');
var query = require('./databaseInterface.js');
function applyChanges(req, res) {
  var formInfo = req.body;
  var queryString =
    escape('INSERT into restaurants (name, image, cuisine_id, city, ' +
    'state, rating, description) VALUES (%L, %L, %L, %L, %L, %L, %L);', formInfo.name,
    formInfo.image, formInfo.cuisine, formInfo.city, formInfo.state,
    formInfo.rating, formInfo.bio);
  console.log(queryString);
  query(queryString, '', function(err, results) {
    res.redirect('/restaurants/' + formInfo.name);
  });
}
module.exports = applyChanges;

var pg = require('pg');
var escape = require('pg-escape');
var query = require('./databaseInterface.js');
function applyChanges(req, res) {
  var restaurantID = req.params.restaurant;
  var formInfo = req.body;
  console.log(req);
  var queryString = 'UPDATE restaurants SET ' +
    escape('name=%L ', formInfo.name) +
    escape(', image=%L ', formInfo.image) +
    escape(', cuisine_id=%L ', formInfo.cuisine) +
    escape(', city=%L ', formInfo.city) +
    escape(', state=%L ', formInfo.state) +
    ', rating=' + formInfo.rating + ' ' +
    escape(', description=%L ', formInfo.bio) +
    'where id=' + restaurantID;
  query(queryString, '', function(error, results) {
    if (error) {
      res.send('Error' + error);
    } else {
      res.send('Changes Made');
    }
  });
}
module.exports = applyChanges;

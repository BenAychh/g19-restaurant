var pg = require('pg');
var escape = require('pg-escape');
var query = require('./databaseInterface.js');
function applyChanges(req, res) {
  var formInfo = req.body;
  var queryString = 'UPDATE reviews SET ' +
    escape('text=%L ', formInfo.review) +
    ', rating=' + formInfo.rating +
    ', modified_date=now()' +
    ' where id=' + req.body.reviewID;
  query(queryString, '', function(error, results) {
    if (error) {
      res.send('Error' + error);
    } else {
      res.send('Changes Made');
    }
  });
}
module.exports = applyChanges;

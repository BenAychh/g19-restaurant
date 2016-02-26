var pg = require('pg');
var escape = require('pg-escape');
var connectionString = require('../../config.js');
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
  console.log(queryString);
  pg.connect(connectionString, function(err, client, done) {
    var results = [];
    // Handle connection errors
    if(err) {
     done();
     console.log(err);
     res.send({ success: false, data: err});
    }

    // SQL Query > Select Data;
    var query = client.query(queryString);

    // After all data is returned, close connection and return results
    query.on('end', function() {
       done();
       res.send('Changes Made');
    });
  });
}
module.exports = applyChanges;

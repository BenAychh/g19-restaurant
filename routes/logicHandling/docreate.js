var pg = require('pg');
var escape = require('pg-escape');
var connectionString = require('../../config.js');
function applyChanges(req, res) {
  var formInfo = req.body;
  var queryString =
    escape('INSERT into restaurants (name, image, cuisine, city, ' +
    'state, rating, description) VALUES (%L, %L, %L, %L, %L, %L, %L);', formInfo.name,
    formInfo.image, formInfo.cuisine, formInfo.city, formInfo.state,
    formInfo.rating, formInfo.bio);
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
       res.redirect('/');
    });
  });
}
module.exports = applyChanges;

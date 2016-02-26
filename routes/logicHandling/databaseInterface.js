var connectionString = require('../../config.js');
var pg = require('pg');
module.exports = {
   query: function(text, values, callback) {
      pg.connect(connectionString, function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          callback(err, result);
        });
      });
   }
};

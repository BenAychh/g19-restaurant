var restaurants = require('./restaurantsdb.js');
module.exports = function(res, name) {
  var options = {
    'title': 'Fake Yelp! - {name}',
    'header': '{name}',
    'stylesheet': '/stylesheets/show.css',
  };
  var parameters = {name: decodeURI(name)};
  restaurants(res, 'show', options, parameters)
};

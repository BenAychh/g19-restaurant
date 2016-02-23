var restaurants = require('./restaurantsdb.js');
module.exports = function(res) {
  var options = {
    'title': 'Fake Yelp!',
    'header': 'gTable',
    'stylesheet': '/stylesheets/index.css'
  };
  restaurants(res, 'index', options);
};

var restaurants = require('./restaurants.js');
module.exports = function() {
  console.log('hello!!');
  return {
    'title': 'Fake Yelp!',
    'header': 'gTable',
    'stylesheet': '/stylesheets/index.css',
    'restaurants': restaurants()
  };
};

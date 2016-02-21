var restaurants = require('./restaurants.js');
module.exports = function(name) {
  var decodedName = decodeURI(name);
  console.log(decodedName);
  var restaurantResults = restaurants({name: decodedName});
  return {
    'title': 'Fake Yelp! - ' + restaurantResults[0].name,
    'header': restaurantResults[0].name,
    'stylesheet': '/stylesheets/show.css',
    'restaurant': restaurantResults[0]};
};

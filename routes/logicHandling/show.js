var restaurants = require('./restaurants.js');
module.exports = function(name) {
  var decodedName = decodeURI(name);
  console.log(decodedName);
  var restaurantResults = restaurants({name: decodedName});
  return {
    'title': 'Fake Yelp! - ' + restaurantResults[0].name,
    'header': 'gTables',
    'stylesheet': '/stylesheets/show.css',
    'restaurants': restaurantResults};
};

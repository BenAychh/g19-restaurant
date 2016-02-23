var restaurants = require('./restaurants.js');
var constants = require('./constants.js');
module.exports = function(name) {
  var decodedName = decodeURI(name);
  var restaurantResults = restaurants({name: decodedName});
  return {
    title: 'Fake Yelp! - ' + restaurantResults[0].name,
    header: 'Editing: ' + restaurantResults[0].name,
    stylesheet: '/stylesheets/new.css',
    restaurant: restaurantResults[0],
    stateOptions: options('states', restaurantResults[0].state),
    cuisineOptions: options('cuisines', restaurantResults[0].cuisine)
  };

};
function options(type, matcher) {
  var optionsArray = [];
  var constantsArray = constants[type];
  var keys = Object.keys(constantsArray);
  keys.forEach(function(key) {
    if (matcher === key) {
      optionsArray.push('<option selected value="' + key + '">' +
        constantsArray[key] + '</option>');
    } else {
      optionsArray.push('<option value="' + key + '">' +
        constantsArray[key] + '</option>');
    }
  });
  return optionsArray;
}

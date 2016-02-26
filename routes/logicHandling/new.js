var restaurants = require('./restaurantsdb.js');
var constants = require('./constants.js');
module.exports = function(res) {
  display(res);
};
function display(res, listOfRestaurants) {
  var params = {
    title: 'New Restaurant',
    header: 'New Restaurant',
    stylesheet: '/stylesheets/edit.css',
    script: '/javascripts/new.js',
    stateOptions: options('states', 'nomatch'),
    cuisineOptions: options('cuisines', 'nomatch'),
    imageOptions: options('images', 'nomatch')
  };
  res.render('new', params);
}
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

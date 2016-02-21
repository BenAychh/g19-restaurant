var restaurants = require('./restaurants.js');
module.exports = function(name) {
  var decodedName = decodeURI(name);
  console.log(decodedName);
  var restaurantResults = restaurants({name: decodedName});
  var state = restaurantResults[0].state;
  var cuisine = restaurantResults[0].cuisine;
  var states = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
    CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
    DC: 'District Of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
    ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
    KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
    MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
    NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
    NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
    OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
    SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
    VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin',
    WY: 'Wyoming'
  };
  var cuisines = {
    American: 'American', Italian: 'Italian', Thai: 'Thai',
    Vietnamese: 'Vietnamese', Mexican: 'Mexican'
  };
  var stateOptions = [];
  var keys = Object.keys(states);
  keys.forEach(function(key) {
    if (state === key) {
      stateOptions.push('<option selected value="' + key + '">' +
        states[key] + '</option>');
    } else {
      stateOptions.push('<option value="' + key + '">' +
        states[key] + '</option>');
    }
  });
  var cuisineOptions = [];
  keys = Object.keys(cuisines);
  keys.forEach(function(key) {
    if (cuisine === key) {
      cuisineOptions.push('<option selected value="' + key + '">' +
        cuisines[key] + '</option>');
    } else {
      cuisineOptions.push('<option value="' + key + '">' +
        cuisines[key] + '</option>');
    }
  });
  return {
    title: 'Fake Yelp! - ' + restaurantResults[0].name,
    header: restaurantResults[0].name,
    stylesheet: '/stylesheets/new.css',
    restaurant: restaurantResults[0],
    stateOptions: stateOptions,
    cuisineOptions: cuisineOptions
  };

};

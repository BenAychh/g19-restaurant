module.exports = function(options) {
  var keyLength = 0;
  if (options) {
    var keys = Object.keys(options);
    keyLength = keys.length;
  }
  return restaurants.filter(function(restaurant) {
    var match = true;
    for (var i = 0; i < keyLength; i++) {
      var key = keys[i];
      if (restaurant[key] !== options[key]) {
        match = false;
        break;
      }
    }
    return match;
  });
};

var restaurants = [
  {
    name: 'Los Tacos',
    image: 'images/mexican.png',
    cuisine: 'Mexican',
    city: 'Denver',
    state: 'CO',
    rating: 5
  },
  {
    name: 'Burger Bar',
    image: 'images/burger.png',
    cuisine: 'American',
    city: 'Seattle',
    state: 'WA',
    rating: 5
  },
  {
    name: 'Pasta Freddy\'s',
    image: 'images/italian.png',
    cuisine: 'Italian',
    city: 'Sacramento',
    state: 'CA',
    rating: 3
  },
  {
    name: 'Bangkok Grill',
    image: 'images/thai.jpg',
    cuisine: 'Thai',
    city: 'Brooklyn',
    state: 'NY',
    rating: 2
  },
  {
    name: 'Pho Mazing',
    image: 'images/pho.jpg',
    cuisine: 'Vietnamese',
    city: 'Boulder',
    state: 'CO',
    rating: 2
  },
  {
    name: 'Fiestaritos',
    image: 'images/mexican.png',
    cuisine: 'Mexican',
    city: 'Lincoln',
    state: 'NE',
    rating: 1
  }
];

var connectionString = '';
try {
  var credentials = require('./credentials.js');
  connectionString = process.env.DATABASE_URL ||
  'postgres://' +
  credentials.username + ':' + credentials.password +
  '@localhost:5432/restaurants';
} catch (e) {
  connectionString = process.env.DATABASE_URL;
}
module.exports = connectionString;

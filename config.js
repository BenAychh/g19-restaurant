var credentials = require('./credentials.js');
var connectionString = process.env.DATABASE_URL ||
'postgres://' +
credentials.username + ':' + credentials.password +
'@localhost:5432/restaurants';
module.exports = connectionString;

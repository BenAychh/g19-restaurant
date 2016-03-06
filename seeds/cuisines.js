var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'cuisines',
  file: 'data/cuisines.csv',
});

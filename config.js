var connectionString = process.env.DATABASE_URL || 'postgres://restaurants:apassword@localhost:5432/restaurants';

module.exports = connectionString;

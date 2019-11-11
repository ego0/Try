const sequelize = require('sequelize')

// connect to postgres
module.exports = new sequelize('test_jubelio', 'mplus02', 'mplus123', {
  host: 'localhost',
  dialect: 'postgres'
});
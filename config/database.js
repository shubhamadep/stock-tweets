const sequelize = require('sequelize');
const configKeys = require('./keys');

console.log("Currently in DATAbase  Config file");
var dbconn = new sequelize(configKeys.mysql.dbURLHeroku);

module.exports = dbconn;

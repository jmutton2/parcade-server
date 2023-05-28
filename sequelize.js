const { Sequelize } = require("sequelize");
require("dotenv").config();

let database = process.env.POSTGRES_DATABASE;
let username = process.env.POSTGRES_USERNAME;
let password = process.env.POSTGRES_PASSWORD;
let host = process.env.POSTGRES_HOST;
let port = process.env.POSTGRES_PORT;

// your config file will be in your directory
var sequelize = new Sequelize(database, username, password, {
	host: host,
	port: port,
	logging: console.log,
	maxConcurrentQueries: 100,
	dialect: "postgres",
});

module.exports = sequelize;

const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Import the Sequelize instance

const User = sequelize.define(
	"accounts",
	{
		user_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		created_on: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ createdAt: false, updatedAt: false }
);

module.exports = User;

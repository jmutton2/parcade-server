const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Import the Sequelize instance

const Properties = sequelize.define(
  "user properties",
  {
    propertyID: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    propName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost_per_hour: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    owner_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priceID: {
      type: DataTypes.STRING,
      allowNull: false
    }

  },
  { createdAt: false, updatedAt: false }
);

// product_id: ID!
// 		product_name: String!
// 		address: String!
// 		spots: [Spot!]!
// 		schedule: [Schedule]
// 		cost_per_hour: Float!
// 		description: String
// 		price_id: ID!
// 		owner: User!

module.exports = Properties;
const { where } = require("sequelize");
const Properties = require("../../models/Properties");

require("dotenv").config();

module.exports = {
  Query: {
    async getProperties() {
      try {
        const properties = await Properties.findAll();
        return properties;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getPropertyByID(_parent, args) {
      try {
        const propertyID = args;
        const property = await Properties.findByPk(propertyID);
        return property;
      } catch (e) {
        throw new Error("Property Not Found: ", error);
      }
    },
    async getPropertyByOwner(_parent, args) {
      try {
        const owner_email = args;
        const properties = await Properties.findAll({
          where: {
            emailAddress: owner_email,
          },
        });
        return properties;
      } catch (e) {
        throw new Error("Property Not Found");
      }
    },
  },
  Mutation: {
    async addProperty(
      parent,
      {
        PropertyCreationInput: property_name,
        address,
        cost_per_hour,
        num_of_spots,
        description,
        owner_email,
      }
    ) {
      propertyID = null; // property ID generator
      stripeID = null; //await stripeID generator
      let newProperty = new Properties({
        property_name,
        address,
        cost_per_hour,
        num_of_spots,
        description,
        owner_email,
      });

      const res = await newProperty.save();
    },
    async removeProperty(propertyID) {
      const property_to_delete = await Properties.destroy({
        where: { propertyID: propertyID },
      });
    },
    async changePropertyData(
      propertyID,
      {
        PropertyCreationInput: property_name,
        address,
        cost_per_hour,
        num_of_spots,
        description,
        owner_email,
      }
    ) {
      let property = await Properties.findByPk(propertyID);
      if (property_name) {
        property.propName = property_name;
      }
      if (address) {
        property.address = address;
      }
      if (cost_per_hour) {
        cost_per_hour;
        property.cost_per_hour = address;
      }
      if (num_of_spots) {
        property.num_of_spots = num_of_spots;
      }
      if (description) {
        property.description = description;
      }
      if (owner_email) {
        property.owner_email = owner_email;
      }
    },
  },
};

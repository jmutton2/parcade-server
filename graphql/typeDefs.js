const { gql } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  ser,
});

module.exports = gql`
	type Spot {
		spot_num:Int!
		partOf: Property!
	}
	type Property {
		product_id: ID!
		product_name: String!
		address: String!
		spots: [Spot!]!
		schedule: [Schedule]
		cost_per_hour: Float!
		description: String
		price_id: ID!
		owner: User!
	}
	type Booking {
		booking_id: ID!
		spot: Spot!
		booking_start: DateTime!
		booking_end: DateTime!
		price: Float!
		booking_user: User!
	}
	type Schedule {
		property: Property!
		time_start: Int!
		time_end: Int!
		repeating: Boolean!
		weekly_schedule: [Boolean!]
	}
	type Account {
		user_id: ID!
		username: String!
		email: String!
		password: String!
		created_on: String!
	}
	type User {
		user_id: ID!
		email: String!
		token: String!
		username: String!
		created_on: String!
	}
	input PropertyCreationInput {
		property_name: String!
		address: String!
		cost_per_hour: Float!
		num_of_spots: Int!
		description: String
		owner_email: String!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String
	}
	type Query {
		getUsers: [Account]
		getProperties: [Property]
		getPropertyByID(propertyID: String!): Property!
		getPropertyByOwner(owner_email: String): [Property]
		getBookingsByProperty()
		getBookingsByRenterID()
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		addProperty(propertyInput: Property)
		removeProperty(propertyID: String!)
		changePropertyData(propertyID: String!)
		createBooking()
	}
`;

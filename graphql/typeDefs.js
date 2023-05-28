const { gql } = require("apollo-server");

module.exports = gql`
	type Account {
		user_id: ID!
		username: String!
		email: String!
		password: String!
		created_on: String!
	}
	type Query {
		sayHi: String!
		getUsers: [Account]
	}
`;

const { gql } = require("apollo-server");

module.exports = gql`
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
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String
	}
	type Query {
		getUsers: [Account]
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
	}
`;

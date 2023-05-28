const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");

// Connection
const sequelize = require("./sequelize");

// All Types
const typeDefs = require("./graphql/typeDefs");

// Resolvers
const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

try {
	sequelize.authenticate().then((res) => {
		server.listen({ port: 5000 }).then((res) => {
			console.log(`Server running at ${res.url}`);
		});
	});
} catch (error) {
	return "Unable to connect to the database:", error;
}

const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const { Sequelize } = require("sequelize");

require("dotenv").config();

async function test() {
	try {
		await sequelize.authenticate();
		return "Connection has been established successfully.";
	} catch (error) {
		return "Unable to connect to the database:", error;
	}
}

const typeDefs = gql`
	type Query {
		sayHi: String!
		tests: String
	}
`;

const resolvers = {
	Query: {
		sayHi: () => "Hello World!",
		tests: () => test(),
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

let database = process.env.POSTGRES_DATABASE;
let username = process.env.POSTGRES_USERNAME;
let password = process.env.POSTGRES_PASSWORD;
let host = process.env.POSTGRES_HOST;
let port = process.env.POSTGRES_PORT;

console.log(database, username);
// your config file will be in your directory
var sequelize = new Sequelize(database, username, password, {
	host: host,
	port: port,
	logging: console.log,
	maxConcurrentQueries: 100,
	dialect: "postgres",
});

server.listen({ port: 5000 }).then((res) => {
	console.log(`Server running at ${res.url}`);
});
